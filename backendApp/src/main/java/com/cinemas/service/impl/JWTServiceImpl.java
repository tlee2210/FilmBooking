package com.cinemas.service.impl;

import com.cinemas.exception.AppException;
import com.cinemas.exception.ErrorCode;
import com.cinemas.service.JWTService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import static com.cinemas.exception.ErrorCode.*;

import java.security.*;
import java.util.Date;
import java.util.Map;
import java.util.Objects;

import java.security.spec.ECGenParameterSpec;

@Service
public class JWTServiceImpl implements JWTService {
    private KeyPair keyPair;

    @PostConstruct
    public void initKeys() {
        if (this.keyPair == null) {
            try {
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("EC");
                ECGenParameterSpec ecSpec = new ECGenParameterSpec("secp256r1");
                keyPairGenerator.initialize(ecSpec, new SecureRandom());
                this.keyPair = keyPairGenerator.generateKeyPair();
            } catch (Exception e) {
                throw new IllegalStateException("Failed to generate EC key pair", e);
            }
        }
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))  // 24 hours
                .signWith(getPrivateKey(), SignatureAlgorithm.ES256)
                .compact();
    }

    public String generateRefreshToken(Map<String, Objects> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getPrivateKey(), SignatureAlgorithm.ES256)
                .compact();
    }

    public String extractUserName(String token) {
        return extracClaim(token, Claims::getSubject);
    }

    private <T> T extracClaim(String token, Function<Claims, T> claimsTFunction) {
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    private Claims extractAllClaims(String token) throws AppException{
        try {

            return Jwts.parserBuilder()
                    .setSigningKey(getPublicKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    private PrivateKey getPrivateKey() {
        return this.keyPair.getPrivate();
    }

    private PublicKey getPublicKey() {
        return this.keyPair.getPublic();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExprired(token));
    }

    private boolean isTokenExprired(String token) {
        return extracClaim(token, Claims::getExpiration).before(new Date());
    }

    public String getEmailFromToken(String token) {
        token = token.substring(7);
        Claims claims = extractAllClaims(token);
        String email = String.valueOf(claims.get("sub"));
        return email;
    }
}
