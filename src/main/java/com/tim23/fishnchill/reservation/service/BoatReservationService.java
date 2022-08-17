package com.tim23.fishnchill.reservation.service;

import com.tim23.fishnchill.action.repository.BoatActionRepository;
import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.boat.repository.BoatRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.general.service.DateService;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.model.BoatReservation;
import com.tim23.fishnchill.reservation.repository.BoatReservationRepository;
import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class BoatReservationService {
    private BoatReservationRepository boatReservationRepository;
    private ModelMapper modelMapper;
    private BoatRepository boatRepository;
    private ClientRepository clientRepository;
    private DateService dateService;
    private MailService emailService;
    private UserResponseRepository userResponseRepository;
    private BoatActionRepository boatActionRepository;

    public List<BoatReservationDto> findAll() {
        TypeToken<List<BoatReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatReservationRepository.findAll(), typeToken.getType());
    }

    public List<ClientBoatReservationDto> findAllBoatReservationForClient(Long clientId, boolean isActive) {
        TypeToken<List<ClientBoatReservationDto>> typeToken = new TypeToken<>() {};
        List<ClientBoatReservationDto> reservations;
        if (isActive)
            reservations = modelMapper.map(boatReservationRepository.findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(clientId, LocalDateTime.now()), typeToken.getType());
        else {
            reservations = modelMapper.map(boatReservationRepository.findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
            for (ClientBoatReservationDto reservation : reservations) {
                reservation.setRevisionWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.REVISION));
                reservation.setComplaintWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.COMPLAINT));
            }
        }
        return reservations;
    }

    public List<BoatOwnerBoatReservationDto> findAllPastBoatReservationForBoat(Long clientId) {
        TypeToken<List<BoatOwnerBoatReservationDto>> typeToken = new TypeToken<>() {};
        List<BoatOwnerBoatReservationDto> reservations;
        reservations = modelMapper.map(boatReservationRepository.
                findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
        return reservations;
    }

    public List<BoatReservationDto> findAllReservationsForBoat(Long boatId) {
        TypeToken<List<BoatReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatReservationRepository.findAllByEntityId(boatId), typeToken.getType());
    }

    public BoatReservationDto findById(Long id) {
        BoatReservation boatReservation = boatReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BoatReservation", id));
        return modelMapper.map(boatReservation, BoatReservationDto.class);
    }

    public BoatReservationDto save(NewReservationDto newReservationDto) {
        BoatReservation boatReservation = new BoatReservation();
        boatReservation.setPrice(newReservationDto.getPrice());
        boatReservation.setNumberOfGuests(newReservationDto.getNumberOfGuests());
        boatReservation.setReservationStart(newReservationDto.getReservationStart());
        boatReservation.setReservationEnd(newReservationDto.getReservationEnd());
        boatReservation.setEntity(boatRepository.getById(newReservationDto.getEntityId()));
        boatReservation.setClient(clientRepository.getById(newReservationDto.getClientId()));
        if (newReservationDto.getActionId() != null)
            boatActionRepository.deleteById(newReservationDto.getActionId());
        try {
            emailService.sendBoatReservationEmail(boatReservation.getClient(), boatReservation);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return modelMapper.map(boatReservationRepository.save(boatReservation), BoatReservationDto.class);
    }

    public List<BoatDto> findAllBoatsAvailableInPeriod(DatePeriodDto datePeriodDto) {
        List<Boat> boats = boatRepository.findAll();
        // Filtrira tako da ostanu samo brodovi slobodne u tom periodu
        List<Boat> availableBoats = boats.stream().filter(boat ->
                dateService.isBoatAvailableInPeriod(boat, datePeriodDto.getStartDate(), datePeriodDto.getEndDate())
        ).collect(Collectors.toList());

        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(availableBoats, typeToken.getType());
    }

    public void cancelReservation(Long reservationId) {
        boatReservationRepository.deleteById(reservationId);
    }
}
