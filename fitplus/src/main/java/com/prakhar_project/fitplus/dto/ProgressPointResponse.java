package com.prakhar_project.fitplus.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressPointResponse {

    private String date;

    private Double weight;

}