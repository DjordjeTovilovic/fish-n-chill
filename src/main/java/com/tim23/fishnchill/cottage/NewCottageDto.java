package com.tim23.fishnchill.cottage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.user.model.CottageOwner;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class NewCottageDto {

    private String name;

    private String address;

    private String description;

    private String image = "";

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

        private BigDecimal price;

    private Integer capacity;
    @JsonIgnore
    private CottageOwner owner;
}
