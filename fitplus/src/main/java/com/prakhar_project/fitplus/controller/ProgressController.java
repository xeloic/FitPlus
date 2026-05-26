package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.ProgressResponse;
import com.prakhar_project.fitplus.entity.Exercise;
import com.prakhar_project.fitplus.entity.User;
import com.prakhar_project.fitplus.repository.ExerciseRepository;
import com.prakhar_project.fitplus.repository.SetLogRepository;
import com.prakhar_project.fitplus.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final SetLogRepository setLogRepository;

    private final ExerciseRepository exerciseRepository;

    private final UserRepository userRepository;

    @GetMapping("/{exerciseName}")
    public List<ProgressResponse> getProgress(

            @PathVariable String exerciseName,
            Authentication authentication
    ){

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        Exercise exercise =
                exerciseRepository
                        .findByName(exerciseName)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Exercise not found"
                                )
                        );

        return setLogRepository.getExerciseProgress(

                exercise.getId(),
                user.getId()

        );

    }

}