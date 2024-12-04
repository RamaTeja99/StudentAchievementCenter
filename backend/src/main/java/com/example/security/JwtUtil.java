package com.example.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    private final SecretKey secretKey;
    private final long ONE_DAY = 24 * 60 * 60 * 1000; 

    public JwtUtil() {
        String secretString = "62fc888bc30adf3ac6934eb5598f8241ee32a12922da6d06b392716c0b0e7859";
        this.secretKey = Keys.hmacShaKeyFor(secretString.getBytes());
    }

    public String generateToken(String username, String role, String roleSpecificId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .claim("roleSpecificId", roleSpecificId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ONE_DAY))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
