package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.NutritionResponse;
import com.prakhar_project.fitplus.entity.User;
import com.prakhar_project.fitplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/nutrition")
@RequiredArgsConstructor
public class NutritionController {

    private final UserRepository userRepository;

    @GetMapping("/targets")
    public NutritionResponse getTargets(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        double weight = user.getWeight();
        double height = user.getHeight();
        int age = user.getAge();

        // Mifflin St Jeor Formula (male)
        double bmr =
                (10 * weight)
                        + (6.25 * height)
                        - (5 * age)
                        + 5;

        double activityMultiplier = switch (
                user.getActivityLevel().toLowerCase()
                ) {
            case "sedentary" -> 1.2;
            case "light" -> 1.375;
            case "moderate" -> 1.55;
            case "active" -> 1.725;
            case "very_active" -> 1.9;
            default -> 1.55;
        };


        double calories = bmr * activityMultiplier;

        double protein = weight * 2;

        double fats = (calories * 0.25) / 9;

        double carbs =
                (calories - ((protein * 4) + (fats * 9))) / 4;

        double water = weight * 0.05;

        return NutritionResponse.builder()
                .calories(Math.round(calories))
                .protein(Math.round(protein))
                .carbs(Math.round(carbs))
                .fats(Math.round(fats))
                .water(Math.round(water * 10.0) / 10.0)
                .build();
    }
}