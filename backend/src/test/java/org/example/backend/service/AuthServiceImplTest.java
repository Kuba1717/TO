package org.example.backend.service;

import org.example.backend.dto.LoginRequest;
import org.example.backend.dto.RegisterRequest;
import org.example.backend.dto.UserResponse;
import org.example.backend.exception.EmailAlreadyExistsException;
import org.example.backend.exception.TokenRefreshException;
import org.example.backend.exception.UsernameAlreadyExistsException;
import org.example.backend.jwt.JwtTokenProvider;
import org.example.backend.jwt.TokenBlacklistService;
import org.example.backend.model.Role;
import org.example.backend.model.RoleName;
import org.example.backend.model.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @Mock
    private TokenBlacklistService tokenBlacklistService;

    @InjectMocks
    private AuthServiceImpl authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User user;
    private Role role;
    private UserDetails userDetails;
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("testuser", "test@example.com", "password123");
        loginRequest = new LoginRequest("test@example.com", "password123");

        role = new Role();
        role.setId(1L);
        role.setName(RoleName.CLIENT);

        Set<Role> roles = new HashSet<>();
        roles.add(role);

        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setEmail("test@example.com");
        user.setPassword("encoded_password");
        user.setRoles(roles);

        userDetails = org.springframework.security.core.userdetails.User.builder()
                .username("test@example.com")
                .password("encoded_password")
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("CLIENT")))
                .build();

        authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    @Test
    void testRegisterUserSuccess() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(roleRepository.findByName(RoleName.CLIENT)).thenReturn(Optional.of(role));
        when(passwordEncoder.encode("password123")).thenReturn("encoded_password");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("testuser", response.getUsername());
        assertEquals("test@example.com", response.getEmail());

        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(roleRepository).findByName(RoleName.CLIENT);
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testRegisterUserWithExistingUsername() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> {
            authService.register(registerRequest);
        });

        verify(userRepository).existsByUsername("testuser");
        verifyNoMoreInteractions(userRepository, roleRepository, passwordEncoder);
    }

    @Test
    void testRegisterUserWithExistingEmail() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class, () -> {
            authService.register(registerRequest);
        });

        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verifyNoMoreInteractions(userRepository, roleRepository, passwordEncoder);
    }

    @Test
    void testLoginSuccess() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(jwtTokenProvider.generateAccessToken(userDetails)).thenReturn("access_token");
        when(jwtTokenProvider.generateRefreshToken(userDetails)).thenReturn("refresh_token");

        Map<String, String> response = authService.login(loginRequest);

        assertNotNull(response);
        assertEquals("access_token", response.get("accessToken"));
        assertEquals("refresh_token", response.get("refreshToken"));

        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(jwtTokenProvider).generateAccessToken(userDetails);
        verify(jwtTokenProvider).generateRefreshToken(userDetails);
    }

    @Test
    void testRefreshTokenSuccess() {
        when(tokenBlacklistService.isTokenBlacklisted("refresh_token")).thenReturn(false);
        when(jwtTokenProvider.isRefreshToken("refresh_token")).thenReturn(true);
        when(jwtTokenProvider.getEmailFromToken("refresh_token")).thenReturn("test@example.com");
        when(userDetailsService.loadUserByUsername("test@example.com")).thenReturn(userDetails);
        when(jwtTokenProvider.validateToken("refresh_token", userDetails)).thenReturn(true);
        when(jwtTokenProvider.generateAccessToken(userDetails)).thenReturn("new_access_token");
        when(jwtTokenProvider.generateRefreshToken(userDetails)).thenReturn("new_refresh_token");

        Map<String, String> response = authService.refreshToken("refresh_token");

        assertNotNull(response);
        assertEquals("new_access_token", response.get("accessToken"));
        assertEquals("new_refresh_token", response.get("refreshToken"));

        verify(tokenBlacklistService).isTokenBlacklisted("refresh_token");
        verify(jwtTokenProvider).isRefreshToken("refresh_token");
        verify(jwtTokenProvider).getEmailFromToken("refresh_token");
        verify(userDetailsService).loadUserByUsername("test@example.com");
        verify(jwtTokenProvider).validateToken("refresh_token", userDetails);
        verify(tokenBlacklistService).blacklistToken("refresh_token", "test@example.com");
        verify(jwtTokenProvider).generateAccessToken(userDetails);
        verify(jwtTokenProvider).generateRefreshToken(userDetails);
    }

    @Test
    void testRefreshTokenWithBlacklistedToken() {
        when(tokenBlacklistService.isTokenBlacklisted("refresh_token")).thenReturn(true);

        assertThrows(TokenRefreshException.class, () -> {
            authService.refreshToken("refresh_token");
        });

        verify(tokenBlacklistService).isTokenBlacklisted("refresh_token");
        verifyNoMoreInteractions(jwtTokenProvider, userDetailsService);
    }

    @Test
    void testLogout() {
        authService.logout("test@example.com", "refresh_token");

        verify(tokenBlacklistService).blacklistToken("refresh_token", "test@example.com");
    }
}
