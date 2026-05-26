package com.prakhar_project.fitplus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String name;

    private Double height;

    private Double weight;

    private Integer age;

    private String activityLevel;
}