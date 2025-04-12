package org.example.backend.jwt;

import io.jsonwebtoken.JwtException;
import org.example.backend.model.User;
import org.example.backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenBlacklistService {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(TokenBlacklistService.class);
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    public TokenBlacklistService(BlacklistedTokenRepository blacklistedTokenRepository,
                                 JwtTokenProvider jwtTokenProvider,
                                 UserRepository userRepository) {
        this.blacklistedTokenRepository = blacklistedTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokenRepository.existsByToken(token);
    }

    public void blacklistToken(String token, String username) {
        if (!isTokenBlacklisted(token)) {
            try {
                Date expiryDate = jwtTokenProvider.getExpirationDateFromToken(token);
                User user = userRepository.findByEmail(username)
                        .orElse(null);

                BlacklistedToken blacklistedToken = new BlacklistedToken();
                blacklistedToken.setToken(token);
                blacklistedToken.setExpiryDate(expiryDate);
                blacklistedToken.setBlacklistedAt(new java.util.Date());
                blacklistedToken.setUser(user);

                blacklistedTokenRepository.save(blacklistedToken);
                logger.info("Token blacklisted for user: {} with expiry: {}", username, expiryDate);

            } catch (JwtException e) {
                logger.error("Could not extract expiry date from token during blacklisting: {}", e.getMessage());
            }
        }
    }
}

