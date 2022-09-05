package com.tim23.fishnchill.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDto {

    @NotNull
    private String username;

    @NotNull
    private String password;

    @Email
    @NotNull
    private String email;

    @NotNull
    private String role;

    private String firstName;

    private String lastName;

    private String country;

    private String city;

    private String address;

    private String phoneNumber;

}
