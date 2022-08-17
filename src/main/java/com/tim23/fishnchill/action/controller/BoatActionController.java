package com.tim23.fishnchill.action.controller;

import com.tim23.fishnchill.action.dto.BoatActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.service.BoatActionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/boats/actions", produces = MediaType.APPLICATION_JSON_VALUE)
public class BoatActionController {
    private BoatActionService boatActionService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatActionDto> findAll() {
        return boatActionService.findAll();
    }

    @GetMapping("/active")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<BoatActionDto> findAllActiveActions() {
        return boatActionService.findAllActiveActions();
    }

    @GetMapping("/exist")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public boolean checkIfExist() {
        return boatActionService.checkIfExist();
    }

    @GetMapping("/{actionId}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public BoatActionDto findById(@PathVariable("actionId") Long actionId) {
        return boatActionService.findById(actionId);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public BoatActionDto save(@RequestBody NewActionDto newActionDto) {
        return boatActionService.save(newActionDto);
    }

    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@PathVariable("id") Long id) {
        boatActionService.remove(id);
    }
}
