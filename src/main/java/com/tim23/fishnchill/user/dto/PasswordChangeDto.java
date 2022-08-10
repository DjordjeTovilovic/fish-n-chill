package com.tim23.fishnchill.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordChangeDto {
    @NotNull
    private String oldPassword;
    @NotNull
    private String newPassword;

    private String role;

    public void printInfo(){
        System.out.println(
                        "opw: " + this.oldPassword +
                        "\nnpw: " + this.newPassword +
                        "\nrole: " + this.role);
    }
}
