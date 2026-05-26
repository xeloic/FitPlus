package com.prakhar_project.fitplus.repository;

import java.util.Optional;
import com.prakhar_project.fitplus.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository
        extends JpaRepository<Exercise, Long> {

    List<Exercise> findByIsCustomFalse();

    List<Exercise> findByUserId(Long userId);

    Optional<Exercise> findByName(
            String name
    );
}