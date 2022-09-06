package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.reservation.dto.AdventureOwnerAdventureReservationDto;
import com.tim23.fishnchill.reservation.dto.BoatOwnerBoatReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageOwnerCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.NewReportDto;

import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.service.OwnerService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OwnerController {

    private TokenUtils tokenUtils;
    private OwnerService ownerService;


    @GetMapping(value = "/owner/all-unactivated-owners")
    public List<User> getAllInactiveOwners() {
        return ownerService.getAllInactiveOwners();
    }


    @GetMapping("/owner/cottages/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageOwnerCottageReservationDto> findAllActiveCottageOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllActiveCottageOwnerReservations(ownerId);
    }

    @GetMapping("/owner/cottages/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageOwnerCottageReservationDto> findAllPastCottageOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllPastCottageOwnerReservations(ownerId);
    }

    @GetMapping("/owner/boats/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatOwnerBoatReservationDto> findAllActiveBoatOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllActiveBoatOwnerReservations(ownerId);
    }

    @GetMapping("/owner/boats/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatOwnerBoatReservationDto> findAllPastBoatOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllPastBoatOwnerReservations(ownerId);
    }

    @GetMapping("/owner/adventures/reservations/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureOwnerAdventureReservationDto> findAllActiveAdventureOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllActiveAdventureOwnerReservations(ownerId);
    }

    @GetMapping("/owner/adventures/reservations/past")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureOwnerAdventureReservationDto> findAllPastAdventureOwnerReservations(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        return ownerService.findAllPastAdventureOwnerReservations(ownerId);
    }


    @PostMapping("/cottages/reservations/reports")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void makeCottageReport(@RequestBody NewReportDto newReportDto) {
        ownerService.makeCottageReport(newReportDto);
    }

    @PostMapping("/boats/reservations/reports")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void makeBoatReport(@RequestBody NewReportDto newReportDto) {
        ownerService.makeBoatReport(newReportDto);
    }

    @PostMapping("/adventures/reservations/reports")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void makeAdventureReport(@RequestBody NewReportDto newReportDto) {
        ownerService.makeAdventureReport(newReportDto);
    }

}
