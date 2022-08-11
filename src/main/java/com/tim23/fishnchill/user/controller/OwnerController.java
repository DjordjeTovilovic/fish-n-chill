package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.reservation.dto.CottageOwnerCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.service.OwnerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/owner", produces = MediaType.APPLICATION_JSON_VALUE)
public class OwnerController {

    private TokenUtils tokenUtils;
    private OwnerService ownerService;
    private CottageReservationService cottageReservationService;

    @GetMapping("/cottages/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageOwnerCottageReservationDto> findAllActiveCottageOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllActiveCottageOwnerReservations(ownerId);
    }

}
