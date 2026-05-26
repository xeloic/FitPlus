package com.prakhar_project.fitplus.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "workout_plans")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 0 = Sunday, 1 = Monday ... 6 = Saturday
    private Integer dayOfWeek;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(
            mappedBy = "workoutPlan",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<WorkoutExercise>
            exercises;
}