package org.example.backend.service;

import org.example.backend.dto.ModelDto;
import org.example.backend.dto.UserProfile;
import org.example.backend.mapper.UserMapper;
import org.example.backend.model.Model;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName().toString()))
                        .toList())
                .build();
    }

    public UserProfile getUserProfileResponseByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        return userMapper.toDto(user);
    }

    public UserProfile updateUserProfile(String email, UserProfile userProfile) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return null;
        }
        userMapper.updateEntity(user, userProfile);
        User updatedUser = userRepository.save(user);
        return userMapper.toDto(updatedUser);
    }
}
