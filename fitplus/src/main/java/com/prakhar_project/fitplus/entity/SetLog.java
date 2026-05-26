package com.prakhar_project.fitplus.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "set_logs")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SetLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer setNumber;

    private Double weight;

    private Integer reps;

    @ManyToOne
    @JoinColumn(name = "workout_session_id")
    private WorkoutSession workoutSession;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}