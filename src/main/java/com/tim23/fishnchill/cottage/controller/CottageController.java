package com.tim23.fishnchill.cottage.controller;


import com.tim23.fishnchill.cottage.CottageDto;
import com.tim23.fishnchill.cottage.NewCottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.service.CottageService;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.service.CottageReservationService;
import com.tim23.fishnchill.security.TokenUtils;
import com.tim23.fishnchill.user.model.CottageOwner;
import com.tim23.fishnchill.user.repository.CottageOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/cottages", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageController {

    private CottageService cottageService;
    private CottageReservationService cottageReservationService;
    private TokenUtils tokenUtils;
    private CottageOwnerRepository cottageOwnerRepository;
    private ModelMapper modelMapper;
    private ImageRepository imageRepository;


    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findAll() {
        return cottageService.findAll();
    }

    @GetMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public CottageDto findById(@PathVariable("id") Long id) {
        return cottageService.findById(id);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        cottageService.remove(id);
    }

    @GetMapping(value = "/name/{name}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByNameContaining(@PathVariable("name") String name) {
        return cottageService.findByNameContaining(name);
    }

    @GetMapping(value = "/description/{description}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByDescriptionContaining(@PathVariable("description") String description) {
        return cottageService.findByDescriptionContaining(description);
    }

    @GetMapping(value = "/address/{address}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByAddressContaining(@PathVariable("address") String address) {
        return cottageService.findByAddressContaining(address);
    }

    @GetMapping(value = "/anything/{anything}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByAnything(@PathVariable("anything") String anything) {
        return cottageService.findByAnything(anything, anything, anything);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody CottageDto newCottageDto, @PathVariable("id") Long id) throws Exception {
        newCottageDto.setId(id);
        cottageService.update(newCottageDto);
    }

    @PostMapping(value = "/findByPeriod")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByPeriod(@RequestBody DatePeriodDto datePeriod) {
        return cottageReservationService.findAllCottagesAvailableInPeriod(datePeriod);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Cottage addNewCottage(@RequestBody NewCottageDto newCottageDto, HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);

        return cottageService.addNewCottageForOwner(ownerId, newCottageDto);
    }

    @GetMapping(value = "owned")
    public List<CottageDto> getAllCottagesForOwner(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        CottageOwner owner = cottageOwnerRepository.getById(ownerId);

        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(owner.getEntities(), typeToken.getType());
    }

}
