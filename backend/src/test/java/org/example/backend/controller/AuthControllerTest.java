package org.example.backend.controller;

import static org.junit.jupiter.api.Assertions.*;

import org.example.backend.dto.LoginRequest;
import org.example.backend.dto.RegisterRequest;
import org.example.backend.jwt.BlacklistedTokenRepository;
import org.example.backend.model.Role;
import org.example.backend.model.RoleName;
import org.example.backend.model.User;
import org.example.backend.repository.RoleRepository;
import org.example.backend.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.util.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class AuthControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    private String baseUrl;
    private Role clientRole;

    @BeforeEach
    void setUp() {
        baseUrl = "http://localhost:" + port + "/api/auth";

        clientRole = roleRepository.findByName(RoleName.CLIENT)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(RoleName.CLIENT);
                    return roleRepository.save(role);
                });
    }

    @AfterEach
    void tearDown() {
        blacklistedTokenRepository.deleteAll();

        userRepository.deleteAll(userRepository.findAll().stream()
                .filter(user -> user.getEmail().contains("test") || user.getUsername().contains("test"))
                .toList());
    }

    @Test
    void testRegisterUser() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("testintegration");
        request.setEmail("testintegration@example.com");
        request.setPassword("password123");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                baseUrl + "/register", request, Map.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("testintegration", response.getBody().get("username"));
        assertEquals("testintegration@example.com", response.getBody().get("email"));

        assertTrue(userRepository.existsByEmail("testintegration@example.com"));
    }

    @Test
    void testLoginSuccess() {
        User user = new User();
        user.setUsername("testlogin");
        user.setEmail("testlogin@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        Set<Role> roles = new HashSet<>();
        roles.add(clientRole);
        user.setRoles(roles);
        userRepository.save(user);

        LoginRequest request = new LoginRequest("testlogin@example.com", "password123");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                baseUrl + "/login", request, Map.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().get("accessToken"));
        assertNotNull(response.getBody().get("refreshToken"));
    }

    @Test
    void testTokenRefresh() {
        User user = new User();
        user.setUsername("testrefresh");
        user.setEmail("testrefresh@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        Set<Role> roles = new HashSet<>();
        roles.add(clientRole);
        user.setRoles(roles);
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("testrefresh@example.com", "password123");

        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(
                baseUrl + "/login", loginRequest, Map.class);

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        String refreshToken = (String) Objects.requireNonNull(loginResponse.getBody()).get("refreshToken");

        Map<String, String> refreshRequest = new HashMap<>();
        refreshRequest.put("refreshToken", refreshToken);

        ResponseEntity<Map> refreshResponse = restTemplate.postForEntity(
                baseUrl + "/refresh", refreshRequest, Map.class);

        assertEquals(HttpStatus.OK, refreshResponse.getStatusCode());
        assertNotNull(refreshResponse.getBody());
        assertNotNull(refreshResponse.getBody().get("accessToken"));
        assertNotNull(refreshResponse.getBody().get("refreshToken"));

        assertNotEquals(loginResponse.getBody().get("accessToken"),
                refreshResponse.getBody().get("accessToken"));
        assertNotEquals(loginResponse.getBody().get("refreshToken"),
                refreshResponse.getBody().get("refreshToken"));
    }

    @Test
    void testLogout() {
        User user = new User();
        user.setUsername("testlogout");
        user.setEmail("testlogout@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        Set<Role> roles = new HashSet<>();
        roles.add(clientRole);
        user.setRoles(roles);
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("testlogout@example.com", "password123");

        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(
                baseUrl + "/login", loginRequest, Map.class);

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        String refreshToken = (String) loginResponse.getBody().get("refreshToken");

        Map<String, String> logoutRequest = new HashMap<>();
        logoutRequest.put("email", "testlogout@example.com");
        logoutRequest.put("refreshToken", refreshToken);

        ResponseEntity<String> logoutResponse = restTemplate.postForEntity(
                baseUrl + "/logout", logoutRequest, String.class);

        assertEquals(HttpStatus.OK, logoutResponse.getStatusCode());
        assertEquals("Logged out successfully", logoutResponse.getBody());

        Map<String, String> refreshRequest = new HashMap<>();
        refreshRequest.put("refreshToken", refreshToken);

        ResponseEntity<Map> refreshResponse = restTemplate.postForEntity(
                baseUrl + "/refresh", refreshRequest, Map.class);

        assertEquals(HttpStatus.FORBIDDEN, refreshResponse.getStatusCode());
    }

    @Test
    void testProtectedEndpointWithToken() {
        User user = new User();
        user.setUsername("testprotected");
        user.setEmail("testprotected@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        Set<Role> roles = new HashSet<>();
        roles.add(clientRole);
        user.setRoles(roles);
        userRepository.save(user);

        LoginRequest loginRequest = new LoginRequest("testprotected@example.com", "password123");
        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(
                baseUrl + "/login", loginRequest, Map.class);

        assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        String accessToken = (String) loginResponse.getBody().get("accessToken");

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> httpEntity = new HttpEntity<>(headers);

        ResponseEntity<String> authenticatedResponse = restTemplate.exchange(
                "http://localhost:" + port + "/api/some-protected-endpoint",
                HttpMethod.GET, httpEntity, String.class);

        assertNotEquals(HttpStatus.UNAUTHORIZED, authenticatedResponse.getStatusCode());
        assertNotEquals(HttpStatus.FORBIDDEN, authenticatedResponse.getStatusCode());
    }
}
