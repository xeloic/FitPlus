package com.prakhar_project.fitplus.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProgressResponse {

    private String date;

    private Double maxWeight;

    private Double totalVolume;
}