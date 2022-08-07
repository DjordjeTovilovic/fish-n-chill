package com.tim23.fishnchill.general.dto;

import com.tim23.fishnchill.user.dto.ClientDto;
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

    private ClientDto client;

    private EntityDto entity;

    private Float rating;
}
