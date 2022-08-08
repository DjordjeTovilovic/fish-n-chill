package com.tim23.fishnchill.user.dto;

import com.tim23.fishnchill.general.model.enums.ClientResponseType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponseDtoInfo {
    private String explanation;

    private Long clientId;

    private Long entityId;

    private Long ownerId;
}
