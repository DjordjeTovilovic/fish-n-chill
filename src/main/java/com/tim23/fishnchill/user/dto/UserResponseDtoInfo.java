package com.tim23.fishnchill.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDtoInfo {
    private String explanation;

    private Long userId;

    private Long entityId;

    private Long ownerId;

    private Long reservationId;
}
