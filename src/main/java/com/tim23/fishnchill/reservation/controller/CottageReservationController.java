package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
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
public class CottageReservationController {
    private TokenUtils tokenUtils;
    private CottageReservationService cottageReservationService;

    @GetMapping("/cottages/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageReservationDto> findAll() {
        return cottageReservationService.findAll();
    }

    @GetMapping("/cottages/reservations/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public CottageReservationDto findById(@PathVariable("reservationId") Long reservationId) {
        return cottageReservationService.findById(reservationId);
    }

    @GetMapping("/cottages/{cottageId}/reservations")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageReservationDto> findAllCottageReservation(@PathVariable("cottageId") Long cottageId) {
        return cottageReservationService.findAllReservationsForCottage(cottageId);
    }

    @GetMapping("/cottages/{cottageId}/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageOwnerCottageReservationDto> findAllPastCottageReservation(@PathVariable("cottageId") Long cottageId) {
        return cottageReservationService.findAllPastCottageReservationForCottage(cottageId);
    }

    @PostMapping("/cottages/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public CottageReservationDto scheduleReservation(HttpServletRequest request, @RequestBody NewReservationDto newReservationDto) {
        Long id = tokenUtils.getUserIdFromRequest(request);
        if (newReservationDto.getClientId() == null) {
            newReservationDto.setClientId(id);
        }
        return cottageReservationService.scheduleReservation(newReservationDto);
    }

    @PostMapping("/cottages/period")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public List<CottageDto> findAllCottagesAvailableInPeriod(@RequestBody DatePeriodDto dateRangeDto) {
        return cottageReservationService.findAllCottagesAvailableInPeriod(dateRangeDto);
    }

    @GetMapping("/cottages/whoami/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientCottageReservationDto> pastReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        List<ClientCottageReservationDto> reservations = cottageReservationService.findAllCottageReservationForClient(id, false);
        for (ClientCottageReservationDto reservation : reservations)
            reservation.setClientId(id);
        return reservations;
    }

    @GetMapping("/cottages/whoami/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ClientCottageReservationDto> activeReservations(HttpServletRequest request) {
        String token = tokenUtils.getToken(request);
        Long id = Long.parseLong(this.tokenUtils.getIdFromToken(token));
        return cottageReservationService.findAllCottageReservationForClient(id, true);
    }

    @DeleteMapping("/cottages/reservations/cancel/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    public void cancelReservation(@PathVariable("reservationId") Long reservationId) {
        cottageReservationService.cancelReservation(reservationId);
    }
}
