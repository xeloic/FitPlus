package com.prakhar_project.fitplus.repository;

import com.prakhar_project.fitplus.entity.WorkoutPlan;
import com.prakhar_project.fitplus.entity.WorkoutSession;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutSessionRepository
        extends JpaRepository<WorkoutSession, Long> {

    List<WorkoutSession>
    findByUserIdOrderByCompletedAtDesc(
            Long userId
    );

    List<WorkoutSession>
    findByWorkoutPlan(
            WorkoutPlan workoutPlan
    );
}