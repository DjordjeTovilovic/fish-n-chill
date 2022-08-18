package com.tim23.fishnchill.general.dto;

import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EntityDto {
    private Long id;

    private String name;

    private String address;

    private String description;

    private Integer capacity;

    private String rules;

    private Float ratingAverage;

    private Float price;

    private Integer ratingCount;

    private String cancellationTerms;

    private String ownerId;

    private Set<Tag> tags;

    private Set<Image> images;

}
