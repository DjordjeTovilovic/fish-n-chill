package com.tim23.fishnchill.general.dto;

import com.tim23.fishnchill.general.model.enums.EntityType;
import com.tim23.fishnchill.user.dto.ClientDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.EnumType;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewClientSubscriptionDto {
    private Long clientId;

    private Long entityId;

    private EntityType type;
}
