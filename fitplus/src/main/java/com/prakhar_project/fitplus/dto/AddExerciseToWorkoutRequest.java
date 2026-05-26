package com.prakhar_project.fitplus.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddExerciseToWorkoutRequest {

    private Long exerciseId;

    private Integer exerciseOrder;

    private Integer targetSets;

    private Integer targetReps;

    private Double targetWeight;
}