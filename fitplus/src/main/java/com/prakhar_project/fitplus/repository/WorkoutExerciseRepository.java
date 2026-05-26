package com.prakhar_project.fitplus.repository;

import com.prakhar_project.fitplus.entity.WorkoutExercise;
import com.prakhar_project.fitplus.entity.WorkoutPlan;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutExerciseRepository
        extends JpaRepository<WorkoutExercise, Long> {

    List<WorkoutExercise>
    findByWorkoutPlanId(
            Long workoutPlanId
    );

    List<WorkoutExercise>
    findByWorkoutPlan(
            WorkoutPlan workoutPlan
    );
}