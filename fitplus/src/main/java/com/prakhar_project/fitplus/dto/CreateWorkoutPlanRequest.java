package com.prakhar_project.fitplus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateWorkoutPlanRequest {

    private String name;

    private Integer dayOfWeek;
}