package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.UpdateProfileRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.prakhar_project.fitplus.dto.UserProfileResponse;
import com.prakhar_project.fitplus.entity.User;
import com.prakhar_project.fitplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/profile")
    public UserProfileResponse getProfile(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .height(user.getHeight())
                .weight(user.getWeight())
                .age(user.getAge())
                .activityLevel(user.getActivityLevel())
                .build();
    }
    @PutMapping("/profile")
    public UserProfileResponse updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        user.setName(request.getName());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setAge(request.getAge());
        user.setActivityLevel(request.getActivityLevel());

        userRepository.save(user);

        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .height(user.getHeight())
                .weight(user.getWeight())
                .age(user.getAge())
                .activityLevel(user.getActivityLevel())
                .build();
    }
}