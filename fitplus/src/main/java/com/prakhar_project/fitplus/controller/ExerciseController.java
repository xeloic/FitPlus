package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.ProgressResponse;
import com.prakhar_project.fitplus.repository.SetLogRepository;
import com.prakhar_project.fitplus.dto.CreateExerciseRequest;
import com.prakhar_project.fitplus.entity.Exercise;
import com.prakhar_project.fitplus.entity.User;
import com.prakhar_project.fitplus.repository.ExerciseRepository;
import com.prakhar_project.fitplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@RequiredArgsConstructor
public class ExerciseController {

    private final SetLogRepository setLogRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @PostMapping("/create")
    public Exercise createExercise(
            Authentication authentication,
            @RequestBody CreateExerciseRequest request
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Exercise exercise = Exercise.builder()
                .name(request.getName())
                .muscleGroup(request.getMuscleGroup())
                .isCustom(true)
                .user(user)
                .build();

        return exerciseRepository.save(exercise);
    }

    @GetMapping
    public List<Exercise> getExercises(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Exercise> globalExercises =
                exerciseRepository.findByIsCustomFalse();

        List<Exercise> customExercises =
                exerciseRepository.findByUserId(user.getId());

        List<Exercise> allExercises = new ArrayList<>();

        allExercises.addAll(globalExercises);
        allExercises.addAll(customExercises);

        return allExercises;
    }

    @GetMapping("/{id}/pr")
    public Double getPersonalRecord(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Double pr = setLogRepository
                .findPersonalRecord(id, user.getId());

        return pr != null ? pr : 0.0;
    }

    @GetMapping("/{id}/volume")
    public Double getTotalVolume(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Double volume = setLogRepository
                .findTotalVolume(id, user.getId());

        return volume != null ? volume : 0.0;
    }

    @GetMapping("/{id}/progress")
    public List<ProgressResponse> getProgress(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return setLogRepository
                .getExerciseProgress(id, user.getId());
    }
}