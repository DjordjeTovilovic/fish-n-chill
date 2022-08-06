package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.cottage.CottageDto;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
import com.tim23.fishnchill.security.TokenUtils;
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
    private MailService emailService;

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


}
