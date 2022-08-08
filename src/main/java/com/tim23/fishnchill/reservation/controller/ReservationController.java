package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    private ReservationService reservationService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<NewReservationDto> findAll() {
        return reservationService.findAll();
    }


    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public NewReservationDto findById(@PathVariable("id") Long id) {
        return reservationService.findById(id);
    }

    @DeleteMapping("/cancel/{reservationId}")
    @ResponseStatus(HttpStatus.OK)
    public void cancelReservation(@PathVariable("reservationId") Long reservationId) {
        reservationService.cancelReservation(reservationId);
    }
}
