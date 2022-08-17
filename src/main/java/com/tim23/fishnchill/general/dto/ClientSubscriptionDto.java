package com.tim23.fishnchill.general.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tim23.fishnchill.general.model.enums.EntityType;
import com.tim23.fishnchill.user.dto.ClientDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientSubscriptionDto {
    private Long id;

    @JsonIgnore
    private ClientDto client;

    private EntityDto entity;

    private EntityType type;
}
