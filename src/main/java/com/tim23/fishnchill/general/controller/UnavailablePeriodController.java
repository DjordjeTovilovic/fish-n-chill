package com.tim23.fishnchill.general.controller;

import com.tim23.fishnchill.general.dto.NewUnavailablePeriodDto;
import com.tim23.fishnchill.general.dto.UnavailablePeriodDto;
import com.tim23.fishnchill.general.service.UnavailablePeriodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UnavailablePeriodController {

    private UnavailablePeriodService unavailablePeriodService;

    @GetMapping("/unavailable/{entityId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<UnavailablePeriodDto> findAllUnavailablePeriodsForEntity(@PathVariable("entityId") Long entityId) {
        return unavailablePeriodService.findAllUnavailablePeriodsForEntity(entityId);
    }

    @PostMapping("/unavailable")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public UnavailablePeriodDto save(@RequestBody NewUnavailablePeriodDto newUnavailablePeriodDto) {
        return unavailablePeriodService.save(newUnavailablePeriodDto);
    }
}
