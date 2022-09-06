package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.model.Report;
import com.tim23.fishnchill.general.repository.ReportRepository;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.reservation.service.ReservationService;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class ReportService {
    private ReportRepository reportRepository;
    private ClientService clientService;
    private MailService mailService;
    private ReservationService reservationService;

    public void approveReport(Long id){
        Report report = reportRepository.getById(id);
        clientService.penalize(report.getClient().getId());
        NewReservationDto reservationDto = reservationService.findById(report.getReservationId());
        mailService.sendClientOwnerReportAnswer(report.getClient(),reservationDto.getReservationStart(), reservationDto.getReservationEnd());
        reportRepository.deleteById(id);
    }

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
