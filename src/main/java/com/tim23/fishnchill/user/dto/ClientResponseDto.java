package com.tim23.fishnchill.user.dto;

import com.tim23.fishnchill.general.dto.EntityDto;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.enums.ClientResponseType;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponseDto {
    private Long id;

    private String explanation;

    private boolean isApproved;

    private ClientResponseType responseType;

    private ClientDto client;

    private EntityDto entity;

    private UserDto owner;
}
