package com.tim23.fishnchill.cottage;

import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.general.dto.ImageDto;
import com.tim23.fishnchill.user.model.CottageOwner;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class NewCottageDto {

    private String name;

    private String address;

    private String description;

    private Set<ImageDto> images;

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

        private BigDecimal price;

    private Integer capacity;

    private CottageOwner owner;
}
