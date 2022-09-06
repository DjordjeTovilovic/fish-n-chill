package com.tim23.fishnchill.cottage.controller;


import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.dto.NewCottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.service.CottageService;
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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/cottages", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageController {

    private CottageService cottageService;
    private CottageReservationService cottageReservationService;
    private TokenUtils tokenUtils;
    private CottageOwnerRepository cottageOwnerRepository;
    private ModelMapper modelMapper;


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
    public CottageDto update(@RequestBody CottageDto newCottageDto, @PathVariable("id") Long id) throws Exception {
        newCottageDto.setId(id);
        return cottageService.update(newCottageDto);
    }

    @PostMapping(value = "/findByPeriod")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageDto> findByPeriod(@RequestBody DatePeriodDto datePeriod) {
        return cottageReservationService.findAllCottagesAvailableInPeriod(datePeriod);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Cottage addNewCottage(@RequestBody NewCottageDto newCottageDto, HttpServletRequest request) {
        if (newCottageDto.getOwnerId() == null) {
            Long ownerId = tokenUtils.getUserIdFromRequest(request);
            newCottageDto.setOwnerId(ownerId);
        }
        return cottageService.addNewCottageForOwner(newCottageDto);
    }

    @GetMapping(value = "owned")
    public List<CottageDto> getAllCottagesForOwner(HttpServletRequest request) {
        Long ownerId = tokenUtils.getUserIdFromRequest(request);
        CottageOwner owner = cottageOwnerRepository.getById(ownerId);

        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(owner.getEntities(), typeToken.getType());
    }
}
