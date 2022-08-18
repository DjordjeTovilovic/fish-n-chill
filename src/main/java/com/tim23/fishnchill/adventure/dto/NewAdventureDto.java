package com.tim23.fishnchill.adventure.dto;

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
public class NewAdventureDto {
    private String name;

    private String address;

    private String description;

    private String image = "";

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

    private BigDecimal price;

    private Integer capacity;

    private Tag tags;

}
