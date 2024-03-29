package com.tim23.fishnchill.reservation.dto;

import com.tim23.fishnchill.cottage.dto.CottageDto;
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
public class ClientCottageReservationDto {
    private Long id;

    private Integer numberOfGuests;

    private BigDecimal price;

    private LocalDateTime reservationStart;

    private LocalDateTime reservationEnd;

    private CottageDto entity;

    private Long clientId;

    private boolean revisionWritten;

    private boolean complaintWritten;
}
