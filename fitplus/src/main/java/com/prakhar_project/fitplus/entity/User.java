package com.prakhar_project.fitplus.entity;

import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<WorkoutPlan> workoutPlans;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private Double height;

    private Double weight;

    private Integer age;

    private String activityLevel;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}