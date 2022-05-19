package com.tim23.fishnchill.general.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingDto {
    private Long id;

    private Double ratingAverage;

    private Integer ratingCount;
}
