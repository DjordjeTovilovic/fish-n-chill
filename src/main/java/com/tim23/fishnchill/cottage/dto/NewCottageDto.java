package com.tim23.fishnchill.cottage.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.cottage.model.Room;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.user.model.CottageOwner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class NewCottageDto {

    private String name;

    private String address;

    private String description;

    private String image = "";

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

    private BigDecimal price;

    private Integer capacity;

    private Tag tags;

    private List<Integer> rooms;

    @JsonIgnore
    private CottageOwner owner;
}
