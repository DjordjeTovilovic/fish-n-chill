package com.tim23.fishnchill.user.dto;

import com.tim23.fishnchill.general.dto.EntityDto;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private Long id;

    private String explanation;

    private boolean isApproved;

    private UserResponseType responseType;

    private UserDto user;

    private EntityDto entity;

    private UserDto owner;
}
