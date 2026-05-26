package com.prakhar_project.fitplus.repository;

import com.prakhar_project.fitplus.entity.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutPlanRepository
        extends JpaRepository<WorkoutPlan, Long> {

    List<WorkoutPlan> findByUserId(Long userId);
}