package com.prakhar_project.fitplus.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogSetRequest {

    private Long exerciseId;

    private Integer setNumber;

    private Double weight;

    private Integer reps;
}
