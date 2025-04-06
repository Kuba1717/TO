package org.example.backend.service;

import org.example.backend.dto.LoginRequest;
import org.example.backend.dto.RegisterRequest;
import org.example.backend.dto.UserResponse;

import java.util.Map;

public interface AuthService {
    UserResponse register(RegisterRequest registerRequest);
    Map<String, String> login(LoginRequest loginRequest);
    Map<String, String> refreshToken(String refreshToken);
    void logout(String email, String refreshToken);
}

