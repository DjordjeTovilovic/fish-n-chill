package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.general.dto.RatingDto;
import com.tim23.fishnchill.general.dto.RatingInfoDto;
import com.tim23.fishnchill.general.service.ClientSubscriptionService;
import com.tim23.fishnchill.general.service.RatingService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.dto.ClientDto;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.dto.UserResponseDtoInfo;
import com.tim23.fishnchill.user.service.ClientService;
import com.tim23.fishnchill.user.service.UserResponseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/clients", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientController {
    private ClientService clientService;
    private TokenUtils tokenUtils;
    private RatingService ratingService;
    private UserResponseService userResponseService;
    private ClientSubscriptionService clientSubscriptionService;

    @GetMapping()
    public List<ClientDto> findAll() {
        return this.clientService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ClientDto findById(@PathVariable("id") Long id) {
        return clientService.findById(id);
    }

    @GetMapping("/whoami/ratings")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<RatingDto> ratings(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        return ratingService.getAllRatingsByClientId(id);
    }

    @PostMapping(value = "/rate")
    public ResponseEntity<?> rate(@RequestBody RatingInfoDto ratingInfo) {
        ratingService.rate(ratingInfo);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }

    @PostMapping(value = "/writeComplaint")
    @ResponseBody
    public UserResponseDto writeComplaint(@RequestBody UserResponseDtoInfo userResponseDtoInfo) {
        return userResponseService.writeComplaint(userResponseDtoInfo);
    }

    @PostMapping(value = "/writeRevision")
    @ResponseBody
    public UserResponseDto writeRevision(@RequestBody UserResponseDtoInfo userResponseDtoInfo) {
        return userResponseService.writeRevision(userResponseDtoInfo);
    }
}
