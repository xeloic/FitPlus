package com.prakhar_project.fitplus.security;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    )
            throws Exception {

        http

                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/auth/**"
                        )
                        .permitAll()

                        .anyRequest()
                        .authenticated()

                )

                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )

                )

                .addFilterBefore(

                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class

                )

                .formLogin(form -> form.disable())

                .httpBasic(
                        httpBasic ->
                                httpBasic.disable()
                );

        return http.build();
    }
}