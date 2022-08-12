package com.tim23.fishnchill.cottage.dto;

import com.tim23.fishnchill.cottage.model.Room;
import com.tim23.fishnchill.general.dto.ImageDto;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.user.model.CottageOwner;
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

    private Float ratingAverage;

    private Integer ratingCount;

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

    private BigDecimal price;

    private Integer capacity;

    private String image;

    private Set<CottageReservationDto> reservations;

    private CottageOwner owner;

    private String ownerReport;

    private Tag tags;

    private Set<Room> rooms;

}
