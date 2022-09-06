package com.tim23.fishnchill.reservation.controller;


import com.tim23.fishnchill.adventure.dto.AdventureDto;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.service.AdventureReservationService;
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
public class AdventureReservationController {
    private TokenUtils tokenUtils;
    private AdventureReservationService adventureReservationService;

    @GetMapping("/adventures/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureReservationDto> findAll() {
        return adventureReservationService.findAll();
    }

    @GetMapping("/adventures/reservations/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public AdventureReservationDto findById(@PathVariable("reservationId") Long reservationId) {
        return adventureReservationService.findById(reservationId);
    }

    @GetMapping("/adventures/{adventureId}/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureReservationDto> findAllAdventureReservation(@PathVariable("adventureId") Long adventureId) {
        return adventureReservationService.findAllReservationsForAdventure(adventureId);
    }

    @GetMapping("/adventures/{adventureId}/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureOwnerAdventureReservationDto> findAllPastAdventureReservation(@PathVariable("adventureId") Long adventureId) {
        return adventureReservationService.findAllPastAdventureReservationForAdventure(adventureId);
    }

    @PostMapping("/adventures/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public AdventureReservationDto scheduleReservation(HttpServletRequest request, @RequestBody NewReservationDto newReservationDto) {
        Long id = tokenUtils.getUserIdFromRequest(request);
        if (newReservationDto.getClientId() == null) {
            newReservationDto.setClientId(id);
        }
        return adventureReservationService.scheduleReservation(newReservationDto);
    }

    @PostMapping("/adventures/period")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<AdventureDto> findAllAdventuresAvailableInPeriod(@RequestBody DatePeriodDto dateRangeDto) {
        return adventureReservationService.findAllAdventuresAvailableInPeriod(dateRangeDto);
    }

    @GetMapping("/adventures/whoami/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientAdventureReservationDto> pastReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        List<ClientAdventureReservationDto> reservations = adventureReservationService.findAllAdventureReservationForClient(id, false);
        for (ClientAdventureReservationDto reservation : reservations)
            reservation.setClientId(id);
        return reservations;
    }

    @GetMapping("/adventures/whoami/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientAdventureReservationDto> activeReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        return adventureReservationService.findAllAdventureReservationForClient(id, true);
    }

    @DeleteMapping("/adventures/reservations/cancel/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    public void cancelReservation(@PathVariable("reservationId") Long reservationId) {
        adventureReservationService.cancelReservation(reservationId);
    }
}
