package com.prakhar_project.fitplus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_exercises")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutExercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer exerciseOrder;

    private Integer targetSets;

    private Integer targetReps;

    private Double targetWeight;

    @ManyToOne
    @JoinColumn(name = "workout_plan_id")
    @JsonIgnore
    private WorkoutPlan workoutPlan;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}