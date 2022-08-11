package com.tim23.fishnchill.action.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewActionDto {
    private Long entityId;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Float actionPrice;

    private Float actualPrice;

    private Integer numberOfGuests;

    private LocalDateTime actionEnd;
}
