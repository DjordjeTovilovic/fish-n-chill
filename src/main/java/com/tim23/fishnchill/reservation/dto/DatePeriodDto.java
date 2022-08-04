package com.tim23.fishnchill.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DatePeriodDto {

    private LocalDateTime startDate;

    private LocalDateTime endDate;
}
