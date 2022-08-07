package com.tim23.fishnchill.reservation.controller;

import com.tim23.fishnchill.reservation.dto.ClientCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
import com.tim23.fishnchill.reservation.service.ReservationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/clients/{clientId}/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ClientReservationController {

    private ReservationService reservationService;
    private CottageReservationService cottageReservationService;

//    @GetMapping()
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
//    public List<ClientReservationDto> findAllReservationForClient(@PathVariable("clientId") Long clientId) {
//        // On
//        return reservationService.findAllReservationForClient(clientId);
//    }

//    @GetMapping(value = "/cottages")
//    @ResponseStatus(HttpStatus.OK)
//    @ResponseBody
//    public List<CottageReservationDto> findAllCottageReservationForClient(@PathVariable("clientId") Long clientId) {
//        return cottageReservationService.findAllCottageReservationForClient(clientId);
//    }

}
