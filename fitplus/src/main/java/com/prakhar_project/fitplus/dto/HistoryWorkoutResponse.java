package com.prakhar_project.fitplus.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryWorkoutResponse {

    private Long sessionId;

    private String workoutName;

    private String completedAt;

    private Integer durationMinutes;

    private Long totalSets;

    private Double totalVolume;
}