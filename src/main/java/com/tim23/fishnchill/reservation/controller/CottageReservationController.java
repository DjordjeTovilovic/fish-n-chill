package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.cottage.CottageDto;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.ClientCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.dto.ClientDto;
import com.tim23.fishnchill.user.dto.UserDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/cottages/reservations")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public CottageReservationDto save(HttpServletRequest request, @RequestBody NewReservationDto newReservationDto) {
        Long id = tokenUtils.getUserIdFromRequest(request);
        newReservationDto.setClientId(id);
        return cottageReservationService.save(newReservationDto);
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
        for(ClientCottageReservationDto reservation : reservations)
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
}
