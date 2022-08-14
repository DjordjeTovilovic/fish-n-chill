package com.tim23.fishnchill.general.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewUnavailablePeriodDto {

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private Long entityId;

}
