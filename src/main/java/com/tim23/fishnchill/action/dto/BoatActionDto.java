package com.tim23.fishnchill.action.dto;

import com.tim23.fishnchill.boat.dto.BoatDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoatActionDto {
    private Long id;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Float actionPrice;

    private Float actualPrice;

    private LocalDateTime actionEnd;

    private Integer numberOfGuests;

    private BoatDto entity;

}
