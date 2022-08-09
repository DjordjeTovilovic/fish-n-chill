package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.general.exception.ResourceConflictException;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.dto.*;
import com.tim23.fishnchill.user.model.Authority;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.service.AuthorityService;
import com.tim23.fishnchill.user.service.ClientService;
import com.tim23.fishnchill.user.service.UserResponseService;
import com.tim23.fishnchill.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

// Primer kontrolera cijim metodama mogu pristupiti samo autorizovani korisnici
@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private UserService userService;
    private TokenUtils tokenUtils;
    private AuthorityService authorityService;
    private PasswordEncoder passwordEncoder;
    private ClientService clientService;
    private UserResponseService userResponseService;

    @GetMapping("/")
//    @PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> loadAll() {
        return this.userService.findAll();
    }

    @GetMapping("/{userId}")
//    @PreAuthorize("hasRole('ADMIN')")
    public UserDto loadById(@PathVariable Long userId) {
        return this.userService.findById(userId);
    }

    @GetMapping("/whoami")
    public ClientDto user(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        UserDto userDto = this.userService.findById(id);
        if (userDto.getAuthorities().get(0).getAuthority().equals("ROLE_CLIENT")) {
            return this.clientService.findById(id);
        } else {
            return new ClientDto(userDto, null);
        }
    }

    @GetMapping("/rolerequests")
    //@PreAuthorize("hasRole('ADMIN')")
    public List<UserDto> findOwnerRequests() {
        List<UserDto> userDtos = new ArrayList<UserDto>();
        List<Authority> authorities = authorityService.findAllContainingRequest();
        for (Authority auth : authorities) {
            userDtos.add(userService.findById(auth.getId()));
        }
        return userDtos;
    }

    @PostMapping("/accept-request/{id}")
    public ResponseEntity<?> acceptOwnerRequest(@PathVariable Long id) throws Exception {
        authorityService.confirmRequest(id);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
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
    public UserResponseDto deleteAccountRequest(@RequestBody UserResponseDtoInfo userResponseDtoInfo) throws Exception {
        return userResponseService.deleteAccountRequest(userResponseDtoInfo);
    }

}
