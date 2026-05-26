package com.prakhar_project.fitplus.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NutritionResponse {

    private double calories;

    private double protein;

    private double carbs;

    private double fats;

    private double water;
}