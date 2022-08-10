package com.tim23.fishnchill.action.dto;

import com.tim23.fishnchill.cottage.CottageDto;
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
public class CottageActionDto {
    private Long id;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private BigDecimal actionPrice;

    private BigDecimal actualPrice;

    private LocalDateTime actionEnd;

    private Integer numberOfGuests;

    private CottageDto entity;
}
