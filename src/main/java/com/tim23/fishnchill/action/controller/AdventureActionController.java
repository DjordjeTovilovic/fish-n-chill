package com.tim23.fishnchill.action.controller;

import com.tim23.fishnchill.action.dto.AdventureActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.service.AdventureActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/adventures/actions", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdventureActionController {
    private AdventureActionService adventureActionService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureActionDto> findAll() {
        return adventureActionService.findAll();
    }

    @GetMapping("/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<AdventureActionDto> findAllActiveActions() {
        return adventureActionService.findAllActiveActions();
    }

    @GetMapping("/exist")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public boolean checkIfExist() {
        return adventureActionService.checkIfExist();
    }

    @GetMapping("/{actionId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public AdventureActionDto findById(@PathVariable("actionId") Long actionId) {
        return adventureActionService.findById(actionId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public AdventureActionDto save(@RequestBody NewActionDto newActionDto) {
        return adventureActionService.save(newActionDto);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        adventureActionService.remove(id);
    }
}
