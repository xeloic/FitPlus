package com.prakhar_project.fitplus.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long id;

    private String name;

    private String email;

    private Double height;

    private Double weight;

    private Integer age;

    private String activityLevel;
}