package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.service.BoatReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatReservationController {
    private TokenUtils tokenUtils;
    private BoatReservationService boatReservationService;

    @GetMapping("/boats/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatReservationDto> findAll() {
        return boatReservationService.findAll();
    }

    @GetMapping("/boats/reservations/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public BoatReservationDto findById(@PathVariable("reservationId") Long reservationId) {
        return boatReservationService.findById(reservationId);
    }

    @GetMapping("/boats/{boatId}/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatReservationDto> findAllBoatReservation(@PathVariable("boatId") Long boatId) {
        return boatReservationService.findAllReservationsForBoat(boatId);
    }

    @GetMapping("/boats/{boatId}/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatOwnerBoatReservationDto> findAllPastBoatReservation(@PathVariable("boatId") Long boatId) {
        return boatReservationService.findAllPastBoatReservationForBoat(boatId);
    }

    @PostMapping("/boats/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public BoatReservationDto scheduleReservation(HttpServletRequest request, @RequestBody NewReservationDto newReservationDto) {
        if (newReservationDto.getClientId() == null) {
            Long id = tokenUtils.getUserIdFromRequest(request);
            newReservationDto.setClientId(id);
        }
        return boatReservationService.scheduleReservation(newReservationDto);
    }

    @PostMapping("/boats/period")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<BoatDto> findAllBoatsAvailableInPeriod(@RequestBody DatePeriodDto dateRangeDto) {
        return boatReservationService.findAllBoatsAvailableInPeriod(dateRangeDto);
    }

    @GetMapping("/boats/whoami/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientBoatReservationDto> pastReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        List<ClientBoatReservationDto> reservations = boatReservationService.findAllBoatReservationForClient(id, false);
        for (ClientBoatReservationDto reservation : reservations)
            reservation.setClientId(id);
        return reservations;
    }

    @GetMapping("/boats/whoami/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientBoatReservationDto> activeReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        return boatReservationService.findAllBoatReservationForClient(id, true);
    }

    @DeleteMapping("/boats/reservations/cancel/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    public void cancelReservation(@PathVariable("reservationId") Long reservationId) {
        boatReservationService.cancelReservation(reservationId);
    }
}
