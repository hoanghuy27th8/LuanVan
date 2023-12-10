package com.example.luanvanbe.config.Security.JWT

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenProvider {
    @Value("\${jwt.secret}")
    private val secretKey: String? = null

    @Value("\${jwt.expiration}")
    private val expiration: Long = 0

    fun generateToken(userDetails: UserDetails): String {
        val now = Date()
        val expiryDate = Date(now.time + expiration)
        return Jwts.builder()
                .claim("role", "Admin")
                .setSubject(userDetails.username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact()
    }

    fun validateToken(token: String): Boolean {
        val username = extractUsername(token)
        return username != null && !isTokenExpired(token)
    }

    fun extractUsername(token: String): String? {
        return try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .body.subject
        } catch (e: Exception) {
            null
        }
    }

    fun isTokenExpired(token: String): Boolean {
        val expiryDate = extractExpiration(token)
        return expiryDate.before(Date())
    }

    fun extractExpiration(token: String): Date {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .body.expiration
    }
}