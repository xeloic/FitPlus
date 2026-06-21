package com.prakhar_project.fitplus.controller;

import java.util.List;
import java.time.temporal.ChronoUnit;
import com.prakhar_project.fitplus.dto.LogSetRequest;
import com.prakhar_project.fitplus.entity.Exercise;
import com.prakhar_project.fitplus.entity.SetLog;
import com.prakhar_project.fitplus.repository.ExerciseRepository;
import com.prakhar_project.fitplus.repository.SetLogRepository;
import com.prakhar_project.fitplus.dto.StartWorkoutRequest;
import com.prakhar_project.fitplus.entity.User;
import com.prakhar_project.fitplus.entity.WorkoutPlan;
import com.prakhar_project.fitplus.entity.WorkoutSession;
import com.prakhar_project.fitplus.repository.UserRepository;
import com.prakhar_project.fitplus.repository.WorkoutPlanRepository;
import com.prakhar_project.fitplus.repository.WorkoutSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.prakhar_project.fitplus.dto.HistoryWorkoutResponse;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/sessions")
@RequiredArgsConstructor
public class WorkoutSessionController {

    private final SetLogRepository setLogRepository;

    private final ExerciseRepository exerciseRepository;

    private final WorkoutSessionRepository workoutSessionRepository;

    private final WorkoutPlanRepository workoutPlanRepository;

    private final UserRepository userRepository;

    @PostMapping("/start")
    public WorkoutSession startWorkout(
            Authentication authentication,
            @RequestBody StartWorkoutRequest request
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        WorkoutPlan workoutPlan =
                workoutPlanRepository.findById(
                        request.getWorkoutPlanId()
                ).orElseThrow(() ->
                        new RuntimeException("Workout plan not found"));

        WorkoutSession workoutSession =
                WorkoutSession.builder()
                        .user(user)
                        .workoutPlan(workoutPlan)
                        .startedAt(LocalDateTime.now())
                        .completedAt(null)
                        .durationMinutes(null)
                        .build();

        return workoutSessionRepository.save(workoutSession);
    }

    @PostMapping("/{id}/finish")
    public WorkoutSession finishWorkout(

            @PathVariable Long id,

            Authentication authentication

    ){

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );

        WorkoutSession session =
                workoutSessionRepository.findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Workout session not found"
                                        )
                        );

        if(
                !session.getUser()
                        .getId()
                        .equals(user.getId())
        ){

            throw new RuntimeException(
                    "Unauthorized"
            );

        }

        LocalDateTime endTime =
                LocalDateTime.now();

        session.setCompletedAt(
                endTime
        );

        long duration =

                ChronoUnit.MINUTES.between(

                        session.getStartedAt(),

                        endTime

                );

        session.setDurationMinutes(
                (int) duration
        );

        return workoutSessionRepository.save(
                session
        );

    }

    @PostMapping("/{id}/set")
    public SetLog logSet(
            @PathVariable Long id,
            @RequestBody LogSetRequest request,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        WorkoutSession workoutSession =
                workoutSessionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Workout session not found"));

        if (!workoutSession.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Exercise exercise =
                exerciseRepository.findById(request.getExerciseId())
                        .orElseThrow(() ->
                                new RuntimeException("Exercise not found"));

        SetLog setLog = SetLog.builder()
                .exercise(exercise)
                .workoutSession(workoutSession)
                .setNumber(request.getSetNumber())
                .weight(request.getWeight())
                .reps(request.getReps())
                .build();

        return setLogRepository.save(setLog);
    }

    @GetMapping("/history")
    public List<HistoryWorkoutResponse> getWorkoutHistory(

            Authentication authentication

    ){

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );

        return workoutSessionRepository
                .findByUserIdOrderByCompletedAtDesc(
                        user.getId()
                )
                .stream()
                .filter(
                        session ->
                                session.getCompletedAt()
                                        != null
                )
                .map(session -> {

                    Double volume =
                            setLogRepository
                                    .totalVolume(
                                            session.getId()
                                    );

                    Long sets =
                            setLogRepository
                                    .countSets(
                                            session.getId()
                                    );

                    return HistoryWorkoutResponse
                            .builder()

                            .sessionId(
                                    session.getId()
                            )

                            .workoutName(
                                    session.getWorkoutPlan()
                                            .getName()
                            )

                            .completedAt(
                                    session.getCompletedAt()
                                            .toString()
                            )

                            .durationMinutes(
                                    session.getDurationMinutes()
                            )

                            .totalSets(
                                    sets != null
                                            ? sets
                                            : 0L
                            )

                            .totalVolume(
                                    volume != null
                                            ? volume
                                            : 0.0
                            )

                            .build();

                })

                .toList();
    }

    @GetMapping("/{id}")
    public List<SetLog> getSessionDetails(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        WorkoutSession workoutSession =
                workoutSessionRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Workout session not found"));

        if (!workoutSession.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        return setLogRepository.findByWorkoutSessionId(id);
    }
}