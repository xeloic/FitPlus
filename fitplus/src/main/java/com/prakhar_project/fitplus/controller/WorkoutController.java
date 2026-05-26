package com.prakhar_project.fitplus.controller;

import com.prakhar_project.fitplus.dto.AddExerciseToWorkoutRequest;
import com.prakhar_project.fitplus.dto.CreateWorkoutPlanRequest;
import com.prakhar_project.fitplus.entity.*;
import com.prakhar_project.fitplus.repository.ExerciseRepository;
import com.prakhar_project.fitplus.repository.UserRepository;
import com.prakhar_project.fitplus.repository.WorkoutExerciseRepository;
import com.prakhar_project.fitplus.repository.WorkoutPlanRepository;
import com.prakhar_project.fitplus.repository.WorkoutSessionRepository;
import com.prakhar_project.fitplus.entity.WorkoutSession;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.prakhar_project.fitplus.entity.SetLog;
import com.prakhar_project.fitplus.repository.SetLogRepository;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@RequiredArgsConstructor
public class WorkoutController {

    private final SetLogRepository setLogRepository;

    private final ExerciseRepository exerciseRepository;

    private final WorkoutExerciseRepository workoutExerciseRepository;

    private final WorkoutPlanRepository workoutPlanRepository;

    private final UserRepository userRepository;

    private final WorkoutSessionRepository workoutSessionRepository;


    @PostMapping("/create")
    public WorkoutPlan createWorkoutPlan(

            Authentication authentication,

            @RequestBody
            CreateWorkoutPlanRequest request
    ) {

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

        WorkoutPlan workoutPlan =
                WorkoutPlan.builder()
                        .name(request.getName())
                        .dayOfWeek(
                                request.getDayOfWeek()
                        )
                        .user(user)
                        .build();

        return workoutPlanRepository.save(
                workoutPlan
        );
    }



    @GetMapping
    public List<WorkoutPlan> getWorkoutPlans(

            Authentication authentication
    ) {

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

        return workoutPlanRepository
                .findByUserId(
                        user.getId()
                );
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteWorkoutPlan(

            @PathVariable Long id,

            Authentication authentication

    ){

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "User not found"
                                        )
                        );

        WorkoutPlan workoutPlan =
                workoutPlanRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Workout not found"
                                        )
                        );

        if(
                !workoutPlan
                        .getUser()
                        .getId()
                        .equals(user.getId())
        ){

            throw new RuntimeException(
                    "Unauthorized"
            );
        }


        List<WorkoutExercise>
                exercises =

                workoutExerciseRepository
                        .findByWorkoutPlan(
                                workoutPlan
                        );

        workoutExerciseRepository
                .deleteAll(
                        exercises
                );


        List<WorkoutSession>
                sessions =

                workoutSessionRepository
                        .findByWorkoutPlan(
                                workoutPlan
                        );


        for(
                WorkoutSession session
                : sessions
        ){

            List<SetLog>
                    logs =

                    setLogRepository
                            .findByWorkoutSession(
                                    session
                            );

            setLogRepository
                    .deleteAll(
                            logs
                    );
        }


        workoutSessionRepository
                .deleteAll(
                        sessions
                );


        workoutPlanRepository
                .delete(
                        workoutPlan
                );

        return ResponseEntity.ok(
                "Workout deleted"
        );
    }



    @PostMapping("/{id}/exercise")
    public WorkoutExercise addExerciseToWorkout(

            @PathVariable Long id,

            @RequestBody
            AddExerciseToWorkoutRequest request,

            Authentication authentication

    ) {

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

        WorkoutPlan workoutPlan =
                workoutPlanRepository.findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Workout not found"
                                        )
                        );

        if(
                !workoutPlan
                        .getUser()
                        .getId()
                        .equals(
                                user.getId()
                        )
        ){

            throw new RuntimeException(
                    "Unauthorized"
            );
        }


        Exercise exercise =
                exerciseRepository
                        .findById(
                                request.getExerciseId()
                        )
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Exercise not found"
                                        )
                        );


        WorkoutExercise
                workoutExercise =

                WorkoutExercise.builder()

                        .workoutPlan(
                                workoutPlan
                        )

                        .exercise(
                                exercise
                        )

                        .exerciseOrder(
                                request.getExerciseOrder()
                        )

                        .targetSets(
                                request.getTargetSets()
                        )

                        .targetReps(
                                request.getTargetReps()
                        )

                        .targetWeight(
                                request.getTargetWeight()
                        )

                        .build();

        return workoutExerciseRepository
                .save(
                        workoutExercise
                );
    }



    @GetMapping("/{id}")
    public List<WorkoutExercise>
    getWorkoutDetails(

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

        WorkoutPlan workoutPlan =
                workoutPlanRepository.findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Workout not found"
                                        )
                        );

        if(
                !workoutPlan
                        .getUser()
                        .getId()
                        .equals(
                                user.getId()
                        )
        ){

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        return workoutExerciseRepository
                .findByWorkoutPlanId(id);
    }



    @DeleteMapping("/exercise/{id}")
    public ResponseEntity<?> deleteExercise(
            @PathVariable Long id
    ){

        workoutExerciseRepository
                .deleteById(id);

        return ResponseEntity.ok(
                "Exercise deleted"
        );
    }



    @PutMapping("/exercise/{id}")
    public ResponseEntity<?> updateExercise(

            @PathVariable Long id,

            @RequestBody
            AddExerciseToWorkoutRequest request
    ){

        WorkoutExercise workoutExercise =
                workoutExerciseRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Exercise not found"
                                        )
                        );

        workoutExercise.setTargetSets(
                request.getTargetSets()
        );

        workoutExercise.setTargetReps(
                request.getTargetReps()
        );

        workoutExercise.setTargetWeight(
                request.getTargetWeight()
        );

        workoutExerciseRepository
                .save(
                        workoutExercise
                );

        return ResponseEntity.ok(
                workoutExercise
        );
    }

}