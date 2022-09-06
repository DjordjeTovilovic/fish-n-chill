package com.tim23.fishnchill.boat.dto;

import com.tim23.fishnchill.general.model.Tag;
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
public class NewBoatDto {
    private Long id;

    private String name;

    private String address;

    private String description;

    private String image = "";

    private BigDecimal price;

    private Integer capacity;

    private Tag tags;

    private String boatType;

    private String length;

    private String engineModel;

    private String enginePower;

    private String maxSpeed;
}
