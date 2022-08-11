package com.tim23.fishnchill.reservation.service;

import com.tim23.fishnchill.action.repository.CottageActionRepository;
import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.general.service.DateService;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.repository.CottageReservationRepository;
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
public class CottageReservationService {

    private CottageReservationRepository cottageReservationRepository;
    private ModelMapper modelMapper;
    private CottageRepository cottageRepository;
    private ClientRepository clientRepository;
    private DateService dateService;
    private MailService emailService;
    private UserResponseRepository userResponseRepository;
    private CottageActionRepository cottageActionRepository;


    public List<CottageReservationDto> findAll() {
        TypeToken<List<CottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageReservationRepository.findAll(), typeToken.getType());
    }

    public List<ClientCottageReservationDto> findAllCottageReservationForClient(Long clientId, boolean isActive) {
        TypeToken<List<ClientCottageReservationDto>> typeToken = new TypeToken<>() {};
        List<ClientCottageReservationDto> reservations;
        if (isActive)
            reservations = modelMapper.map(cottageReservationRepository.findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(clientId, LocalDateTime.now()), typeToken.getType());
        else {
            reservations = modelMapper.map(cottageReservationRepository.findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
            for (ClientCottageReservationDto reservation : reservations) {
                reservation.setRevisionWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.REVISION));
                reservation.setComplaintWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.COMPLAINT));
            }
        }
        return reservations;
    }

    public List<CottageOwnerCottageReservationDto> findAllPastCottageReservationForCottage(Long clientId) {
        TypeToken<List<CottageOwnerCottageReservationDto>> typeToken = new TypeToken<>() {};
        List<CottageOwnerCottageReservationDto> reservations;
        reservations = modelMapper.map(cottageReservationRepository.
                findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
//        for (CottageOwnerCottageReservationDto reservation : reservations) {
//            reservation.setRevisionWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.REVISION));
//            reservation.setComplaintWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.COMPLAINT));
//            }
        return reservations;
    }

    public List<CottageReservationDto> findAllReservationsForCottage(Long cottageId) {
        TypeToken<List<CottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageReservationRepository.findAllByEntityId(cottageId), typeToken.getType());
    }

    public CottageReservationDto findById(Long id) {
        CottageReservation cottageReservation = cottageReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CottageReservation", id));
        return modelMapper.map(cottageReservation, CottageReservationDto.class);
    }

    public CottageReservationDto save(NewReservationDto newReservationDto) {
        CottageReservation cottageReservation = new CottageReservation();
        cottageReservation.setPrice(newReservationDto.getPrice());
        cottageReservation.setNumberOfGuests(newReservationDto.getNumberOfGuests());
        cottageReservation.setReservationStart(newReservationDto.getReservationStart());
        cottageReservation.setReservationEnd(newReservationDto.getReservationEnd());
        cottageReservation.setEntity(cottageRepository.getById(newReservationDto.getEntityId()));
        cottageReservation.setClient(clientRepository.getById(newReservationDto.getClientId()));
        if (newReservationDto.getActionId() != null)
            cottageActionRepository.deleteById(newReservationDto.getActionId());
        try {
            emailService.sendCottageReservationEmail(cottageReservation.getClient(), cottageReservation);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return modelMapper.map(cottageReservationRepository.save(cottageReservation), CottageReservationDto.class);
    }

    public List<CottageDto> findAllCottagesAvailableInPeriod(DatePeriodDto datePeriodDto) {
        List<Cottage> cottages = cottageRepository.findAll();
        // Filtrira tako da ostanu samo vikendice slobodne u tom periodu
        List<Cottage> availableCottages = cottages.stream().filter(cottage ->
                dateService.isCottageAvailableInPeriod(cottage, datePeriodDto.getStartDate(), datePeriodDto.getEndDate())
        ).collect(Collectors.toList());

        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(availableCottages, typeToken.getType());
    }

    public void cancelReservation(Long reservationId) {
        cottageReservationRepository.deleteById(reservationId);
    }
}
