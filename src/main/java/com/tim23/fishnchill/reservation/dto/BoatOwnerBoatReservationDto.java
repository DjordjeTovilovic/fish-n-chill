package com.tim23.fishnchill.reservation.dto;

import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.user.dto.ClientDto;
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
public class BoatOwnerBoatReservationDto {
    private Long id;

    private Integer numberOfGuests;

    private BigDecimal price;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private BoatDto entity;

    private ClientDto client;

    private String ownerReport;

    private boolean revisionWritten;

    private boolean complaintWritten;
}
