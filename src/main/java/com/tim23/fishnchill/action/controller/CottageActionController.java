package com.tim23.fishnchill.action.controller;

import com.tim23.fishnchill.action.dto.CottageActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.service.CottageActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/cottages/actions", produces = MediaType.APPLICATION_JSON_VALUE)
public class CottageActionController {
    private CottageActionService cottageActionService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageActionDto> findAll() {
        return cottageActionService.findAll();
    }

    @GetMapping("/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<CottageActionDto> findAllActiveActions() {
        return cottageActionService.findAllActiveActions();
    }

    @GetMapping("/{actionId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public CottageActionDto findById(@PathVariable("actionId") Long actionId) {
        return cottageActionService.findById(actionId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public CottageActionDto save(@RequestBody NewActionDto newActionDto) {
        return cottageActionService.save(newActionDto);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        cottageActionService.remove(id);
    }
}
