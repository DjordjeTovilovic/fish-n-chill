package com.tim23.fishnchill.adventure.controller;

import com.tim23.fishnchill.adventure.dto.AdventureDto;
import com.tim23.fishnchill.adventure.dto.NewAdventureDto;
import com.tim23.fishnchill.adventure.model.Adventure;
import com.tim23.fishnchill.adventure.service.AdventureService;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.service.AdventureReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.model.AdventureOwner;
import com.tim23.fishnchill.user.repository.AdventureOwnerRepository;
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
@RequestMapping(value = "/api/adventures", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureController {

    private AdventureService adventureService;
    private AdventureReservationService adventureReservationService;
    private TokenUtils tokenUtils;
    private AdventureOwnerRepository adventureOwnerRepository;
    private ModelMapper modelMapper;


    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findAll() {
        return adventureService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public AdventureDto findById(@PathVariable("id") Long id) {
        return adventureService.findById(id);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        adventureService.remove(id);
    }

    @GetMapping(value = "/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findByNameContaining(@PathVariable("name") String name) {
        return adventureService.findByNameContaining(name);
    }

    @GetMapping(value = "/description/{description}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findByDescriptionContaining(@PathVariable("description") String description) {
        return adventureService.findByDescriptionContaining(description);
    }

    @GetMapping(value = "/address/{address}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findByAddressContaining(@PathVariable("address") String address) {
        return adventureService.findByAddressContaining(address);
    }

    @GetMapping(value = "/anything/{anything}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findByAnything(@PathVariable("anything") String anything) {
        return adventureService.findByAnything(anything, anything, anything);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody AdventureDto newAdventureDto, @PathVariable("id") Long id) throws Exception {
        newAdventureDto.setId(id);
        adventureService.update(newAdventureDto);
    }

    @PostMapping(value = "/findByPeriod")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureDto> findByPeriod(@RequestBody DatePeriodDto datePeriod) {
        return adventureReservationService.findAllAdventuresAvailableInPeriod(datePeriod);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Adventure addNewAdventure(@RequestBody NewAdventureDto newAdventureDto, HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);

        return adventureService.addNewAdventureForOwner(ownerId, newAdventureDto);
    }

    @GetMapping(value = "owned")
    public List<AdventureDto> getAllAdventuresForOwner(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        AdventureOwner owner = adventureOwnerRepository.getById(ownerId);

        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(owner.getEntities(), typeToken.getType());
    }
}
