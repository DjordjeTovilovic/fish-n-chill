package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.general.exception.ResourceConflictException;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.dto.*;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.service.AuthorityService;
import com.tim23.fishnchill.user.service.ClientService;
import com.tim23.fishnchill.user.service.UserResponseService;
import com.tim23.fishnchill.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// Primer kontrolera cijim metodama mogu pristupiti samo autorizovani korisnici
//@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private TokenUtils tokenUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ClientService clientService;
    @Autowired
    private UserResponseService userResponseService;

    @GetMapping("/")
//    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> loadAll() {
        return this.userService.findAll();
    }

    @GetMapping("/profile/{id}")
    public ClientDto user(@PathVariable("id") Long id) {
        UserDto userDto = this.userService.findById(id);
        if (userDto.getAuthorities().get(0).getAuthority().equals("ROLE_CLIENT")) {
            return this.clientService.findById(id);
        } else {
            return new ClientDto(userDto, null, null);
        }
    }

    @GetMapping("/whoami")
    public ClientDto user(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        UserDto userDto = this.userService.findById(id);
        if (userDto.getAuthorities().get(0).getAuthority().equals("ROLE_CLIENT")) {
            return this.clientService.findById(id);
        } else {
            return new ClientDto(userDto, null, null);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<User> addUser(@Valid @RequestBody UpdateDto updateDto, HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        User user = this.userService.findByIdPure(id);
        user = this.userService.update(updateDto, user);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }


    @PostMapping(value = "/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeDto passwordChangeDTO, HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        User user = this.userService.findByIdPure(id);
        if (passwordEncoder.matches(passwordChangeDTO.getOldPassword(), user.getPassword())) {
            user = userService.changePassword(passwordChangeDTO.getNewPassword(), user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } else
            throw new ResourceConflictException("Old pw incorrect");
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        userService.deleteUserById(id);
    }

    @PostMapping(value = "/deleteAccount")
    public void deleteUser(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));

        UserDto udto = this.userService.findById(id);

        if (udto.getAuthorities().get(0).getAuthority().equals("ROLE_CLIENT")) {
            this.clientService.deleteClientById(id);
        } else {
            this.userService.deleteUserById(id);
        }
    }

    @PostMapping(value = "/deleteAccountRequest")
    @ResponseBody
    public UserResponseDto deleteAccountRequest(@RequestBody UserResponseDtoInfo userResponseDtoInfo) {
        return userResponseService.deleteAccountRequest(userResponseDtoInfo);
    }

}
