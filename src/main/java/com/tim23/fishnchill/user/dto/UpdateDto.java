package com.tim23.fishnchill.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDto {

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String country;

    private String city;

    private String address;

    private String phoneNumber;

    private String email;

    private String role;

    public void printInfo(){
        System.out.println(
                "username: " + this.username +
                        "\nfn: " + this.firstName +
                        "\nln: " + this.lastName +
                        "\nemail: " + this.email +
                        "\ncountry: " + this.country +
                        "\ncity: " + this.city +
                        "\naddress: " + this.address +
                        "\nphone: " + this.phoneNumber +
                        "\nrole: " + this.role);
    }
}
