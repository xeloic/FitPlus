package com.prakhar_project.fitplus.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "my_super_secret_key_for_fitplus_application_123456";

    private final Key key = Keys.hmacShaKeyFor(
            SECRET_KEY.getBytes()
    );


    public String generateToken(
            String email
    ) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000L * 60 * 60 * 24
                        )
                )

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();

    }



    public String extractEmail(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getSubject
        );

    }



    public <T> T extractClaim(

            String token,

            Function<Claims,T>
                    claimsResolver

    ){

        Claims claims =

                Jwts.parserBuilder()

                        .setSigningKey(
                                key
                        )

                        .build()

                        .parseClaimsJws(
                                token
                        )

                        .getBody();

        return claimsResolver.apply(
                claims
        );

    }



    public boolean isTokenValid(

            String token,

            UserDetails userDetails

    ){

        String email =
                extractEmail(
                        token
                );

        return (

                email.equals(
                        userDetails.getUsername()
                )

                        &&

                        !isTokenExpired(
                                token
                        )

        );

    }



    private boolean isTokenExpired(
            String token
    ){

        return extractClaim(

                token,

                Claims::getExpiration

        ).before(

                new Date()

        );

    }

}