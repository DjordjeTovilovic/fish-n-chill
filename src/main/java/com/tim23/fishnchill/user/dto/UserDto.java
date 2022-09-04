package com.tim23.fishnchill.user.dto;

import com.tim23.fishnchill.user.model.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private String address;

    private String city;

    private String country;

    private String phoneNumber;

    private Boolean enabled;

    private List<Authority> authorities;

    private Boolean deleteRequest;

    private Integer penaltyCount;

    private Integer loyaltyPoints;
}
