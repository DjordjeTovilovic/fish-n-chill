package com.tim23.fishnchill.boat.controller;

import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.boat.dto.NewBoatDto;
import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.boat.service.BoatService;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.service.BoatReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.model.BoatOwner;
import com.tim23.fishnchill.user.repository.BoatOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/boats", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatController {

    private BoatService boatService;
    private BoatReservationService boatReservationService;
    private TokenUtils tokenUtils;
    private BoatOwnerRepository boatOwnerRepository;
    private ModelMapper modelMapper;


    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findAll() {
        return boatService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public BoatDto findById(@PathVariable("id") Long id) {
        return boatService.findById(id);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        boatService.remove(id);
    }

    @GetMapping(value = "/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByNameContaining(@PathVariable("name") String name) {
        return boatService.findByNameContaining(name);
    }

    @GetMapping(value = "/description/{description}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByDescriptionContaining(@PathVariable("description") String description) {
        return boatService.findByDescriptionContaining(description);
    }

    @GetMapping(value = "/address/{address}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByAddressContaining(@PathVariable("address") String address) {
        return boatService.findByAddressContaining(address);
    }

    @GetMapping(value = "/anything/{anything}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByAnything(@PathVariable("anything") String anything) {
        return boatService.findByAnything(anything, anything, anything);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody BoatDto boatDto, @PathVariable("id") Long id) throws Exception {
        boatDto.setId(id);
        boatService.update(boatDto);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void patch(@RequestBody NewBoatDto boatDto, @PathVariable("id") Long id) throws Exception {
        boatService.patch(id, boatDto);
    }

    @PostMapping(value = "/findByPeriod")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatDto> findByPeriod(@RequestBody DatePeriodDto datePeriod) {
        return boatReservationService.findAllBoatsAvailableInPeriod(datePeriod);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Boat addNewBoat(@RequestBody NewBoatDto newBoatDto, HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);

        return boatService.addNewBoatForOwner(ownerId, newBoatDto);
    }

    @GetMapping(value = "owned")
    public List<BoatDto> getAllBoatsForOwner(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        BoatOwner owner = boatOwnerRepository.getById(ownerId);

        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(owner.getEntities(), typeToken.getType());
    }
}
