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
public class ClientDto {

    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String address;

    private String city;

    private String country;

    private String phoneNumber;

    private Integer penaltyCount;

    private Boolean enabled;

    private List<Authority> authorities;

    private Boolean deleteRequest;

    private Integer loyaltyPoints;

    public ClientDto(UserDto userDto, Integer penaltyCount, Integer loyaltyPoints) {
        this.id = userDto.getId();
        this.username = userDto.getUsername();
        this.firstName = userDto.getFirstName();
        this.lastName = userDto.getLastName();
        this.email = userDto.getEmail();
        this.country = userDto.getCountry();
        this.city = userDto.getCity();
        this.address = userDto.getAddress();
        this.phoneNumber = userDto.getPhoneNumber();
        this.enabled = userDto.getEnabled();
        this.penaltyCount = penaltyCount;
        this.authorities = userDto.getAuthorities();
        this.loyaltyPoints = loyaltyPoints;
    }
}
