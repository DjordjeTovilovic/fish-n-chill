package com.tim23.fishnchill.general.controller;


import com.tim23.fishnchill.general.model.Report;
import com.tim23.fishnchill.general.service.ReportService;
import com.tim23.fishnchill.user.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/reports", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReportController {
    @Autowired
    private ReportService reportService;
    @Autowired
    private ClientService clientService;

    @GetMapping()
    public List<Report> getAll(){
        List<Report>reports = reportService.getAll();
        return reports;
    }

    @PostMapping(value = "/approved/{id}")
    public void penalizeUser(@PathVariable("id")Long id){
        reportService.approveReport(id);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteReport(@PathVariable("id")Long id){
        reportService.delete(id);
    }

}
