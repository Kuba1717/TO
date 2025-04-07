package org.example.backend.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class TokenBlacklistService {

    private final Logger logger = LoggerFactory.getLogger(TokenBlacklistService.class);
    private final BlacklistedTokenRepository blacklistedTokenRepository;

    public TokenBlacklistService(BlacklistedTokenRepository blacklistedTokenRepository) {
        this.blacklistedTokenRepository = blacklistedTokenRepository;
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokenRepository.existsByToken(token);
    }

    public void blacklistToken(String token, String username) {
        if (!isTokenBlacklisted(token)) {
            BlacklistedToken blacklistedToken = new BlacklistedToken();
            blacklistedToken.setToken(token);
            blacklistedToken.setBlacklistedAt(new java.util.Date());

            blacklistedTokenRepository.save(blacklistedToken);
            logger.info("Token blacklisted for user: {}", username);
        }
    }
}

