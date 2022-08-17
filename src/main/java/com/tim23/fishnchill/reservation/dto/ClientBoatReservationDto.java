package com.tim23.fishnchill.reservation.dto;

import com.tim23.fishnchill.boat.dto.BoatDto;
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
public class ClientBoatReservationDto {
    private Long id;

    private Integer numberOfGuests;

    private BigDecimal price;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private BoatDto entity;

    private Long clientId;

    private boolean revisionWritten;

    private boolean complaintWritten;
}
