package com.prakhar_project.fitplus.repository;

import com.prakhar_project.fitplus.dto.ProgressResponse;
import com.prakhar_project.fitplus.entity.WorkoutSession;
import org.springframework.data.jpa.repository.Query;
import com.prakhar_project.fitplus.entity.SetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import com.prakhar_project.fitplus.entity.SetLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SetLogRepository
        extends JpaRepository<SetLog, Long> {

    List<SetLog> findByWorkoutSessionId(Long workoutSessionId);
    List<SetLog>
    findByWorkoutSession(
            WorkoutSession workoutSession
    );


    @Query("""
    SELECT MAX(s.weight)
    FROM SetLog s
    WHERE s.exercise.id = :exerciseId
    AND s.workoutSession.user.id = :userId
    """)
    Double findPersonalRecord(
            Long exerciseId,
            Long userId
    );

    @Query("""
    SELECT SUM(s.weight * s.reps)
    FROM SetLog s
    WHERE s.exercise.id = :exerciseId
    AND s.workoutSession.user.id = :userId
    """)
    Double findTotalVolume(
            Long exerciseId,
            Long userId
    );

    @Query("""
    SELECT new com.prakhar_project.fitplus.dto.ProgressResponse(
        CAST(s.workoutSession.completedAt AS string),
        MAX(s.weight),
        SUM(s.weight * s.reps)
    )
    FROM SetLog s
    WHERE s.exercise.id = :exerciseId
    AND s.workoutSession.user.id = :userId
    GROUP BY s.workoutSession.completedAt
    ORDER BY s.workoutSession.completedAt ASC
    """)
    List<ProgressResponse> getExerciseProgress(
            Long exerciseId,
            Long userId
    );


}