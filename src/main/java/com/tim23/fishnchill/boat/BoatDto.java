package com.tim23.fishnchill.boat;

import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.user.model.BoatOwner;
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

    private String description;

    private Integer capacity;

    private String rules;

    private BigDecimal price;

    private String cancellationTerms;

    private Double ratingAverage;

    private Integer ratingCount;

    private LocalDateTime availabilityStart;

    private LocalDateTime availabilityEnd;

    private Long ownerId;

    private Long boatSpecificationId;

    private String boatEnginePower;

    private Set<Image> images;

    private Tag tags;

    private String boatType;

    private String address;

    private BoatOwner owner;
}
