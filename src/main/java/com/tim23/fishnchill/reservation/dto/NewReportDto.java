package com.tim23.fishnchill.reservation.dto;

import com.tim23.fishnchill.general.model.enums.OwnerReportType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewReportDto {

    private Long reservationId;

    private String ownerReport;

    private OwnerReportType ownerReportType;
}
