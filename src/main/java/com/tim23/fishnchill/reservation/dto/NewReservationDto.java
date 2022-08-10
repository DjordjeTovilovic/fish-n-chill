package com.tim23.fishnchill.reservation.dto;

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
public class NewReservationDto {

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private Integer numberOfGuests;

    private BigDecimal price;

    private Long clientId;

    private Long entityId;

    private Long actionId;
}
