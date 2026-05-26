package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.LoginRequest;
import com.prakhar_project.fitplus.dto.RegisterRequest;
import com.prakhar_project.fitplus.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public String login(
            @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }
}