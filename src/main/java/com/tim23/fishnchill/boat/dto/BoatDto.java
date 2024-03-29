package com.tim23.fishnchill.boat.dto;

import com.tim23.fishnchill.action.dto.ActionDto;
import com.tim23.fishnchill.boat.model.BoatSpecification;
import com.tim23.fishnchill.cottage.model.Room;
import com.tim23.fishnchill.general.dto.ImageDto;
import com.tim23.fishnchill.general.dto.UnavailablePeriodDto;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.reservation.dto.BoatReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.user.model.BoatOwner;
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
public class BoatDto {
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

    private Set<BoatReservationDto> reservations;

    private BoatOwner owner;

    private Tag tags;

    private Set<Room> rooms;

    private Set<ActionDto> actions;

    private Set<UnavailablePeriodDto> unavailablePeriods;

    private BoatSpecification boatSpecification;
}
