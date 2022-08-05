package com.tim23.fishnchill.cottage;

import com.tim23.fishnchill.general.dto.ImageDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CottageDto {
    private Long id;

    private String name;

    private String address;

    private String description;

    private Set<ImageDto> images;

    private Double ratingAverage;

    private Integer ratingCount;

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

    private BigDecimal price;

    private Integer capacity;

    private Set<CottageReservationDto> cottageReservations;
}
