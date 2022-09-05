package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.user.dto.ResponseDto;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.service.UserResponseService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {
    private UserResponseService userResponseService;

    @GetMapping()
    public List<UserResponseDto> getAll(){
        return userResponseService.getAll();
    }

    @PostMapping(value = "/revision/{id}")
    public void approveClientRevision(@PathVariable("id") Long id){
        userResponseService.approveClientRevision(id);
    }

    @DeleteMapping(value = "/revision/{id}")
    public void deleteClientRevision(@PathVariable("id") Long id){
        userResponseService.deleteResponse(id);
    }

    @PostMapping(value = "complaint/{id}")
    public void approveClientComplaint(@PathVariable("id") Long id, @RequestBody ResponseDto response){
        System.out.println(response.getResponse());
        userResponseService.answerClientComplaint(id, response.getResponse());
    }

}
