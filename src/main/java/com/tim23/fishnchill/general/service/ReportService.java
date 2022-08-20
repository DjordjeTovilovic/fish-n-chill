package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.model.Report;
import com.tim23.fishnchill.general.repository.ReportRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ReportService {
    private ReportRepository reportRepository;

    public Report save(Report report){
        return reportRepository.save(report);
    }

    public List<Report> getAll(){return reportRepository.findAll();}

    public void delete(Long id){
        reportRepository.deleteById(id);
    }

    public Report getById(Long id){
        return reportRepository.getById(id);
    }
}
