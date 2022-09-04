package com.tim23.fishnchill.reservation.service;


import com.tim23.fishnchill.action.repository.AdventureActionRepository;
import com.tim23.fishnchill.adventure.dto.AdventureDto;
import com.tim23.fishnchill.adventure.model.Adventure;
import com.tim23.fishnchill.adventure.repository.AdventureRepository;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.general.exception.LockingFailureException;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.general.service.DateService;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.*;
import com.tim23.fishnchill.reservation.model.AdventureReservation;
import com.tim23.fishnchill.reservation.repository.AdventureReservationRepository;
import com.tim23.fishnchill.user.model.Client;
import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class AdventureReservationService {
    private AdventureReservationRepository adventureReservationRepository;
    private ModelMapper modelMapper;
    private AdventureRepository adventureRepository;
    private ClientRepository clientRepository;
    private DateService dateService;
    private MailService emailService;
    private UserResponseRepository userResponseRepository;
    private AdventureActionRepository adventureActionRepository;

    public List<AdventureReservationDto> findAll() {
        TypeToken<List<AdventureReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureReservationRepository.findAll(), typeToken.getType());
    }

    public List<ClientAdventureReservationDto> findAllAdventureReservationForClient(Long clientId, boolean isActive) {
        TypeToken<List<ClientAdventureReservationDto>> typeToken = new TypeToken<>() {};
        List<ClientAdventureReservationDto> reservations;
        if (isActive)
            reservations = modelMapper.map(adventureReservationRepository.findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(clientId, LocalDateTime.now()), typeToken.getType());
        else {
            reservations = modelMapper.map(adventureReservationRepository.findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
            for (ClientAdventureReservationDto reservation : reservations) {
                reservation.setRevisionWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.REVISION));
                reservation.setComplaintWritten(userResponseRepository.existsByReservationIdAndResponseType(reservation.getId(), UserResponseType.COMPLAINT));
            }
        }
        return reservations;
    }

    public List<AdventureOwnerAdventureReservationDto> findAllPastAdventureReservationForAdventure(Long clientId) {
        TypeToken<List<AdventureOwnerAdventureReservationDto>> typeToken = new TypeToken<>() {};
        List<AdventureOwnerAdventureReservationDto> reservations;
        reservations = modelMapper.map(adventureReservationRepository.
                findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(clientId, LocalDateTime.now()), typeToken.getType());
        return reservations;
    }

    public List<AdventureReservationDto> findAllReservationsForAdventure(Long adventureId) {
        TypeToken<List<AdventureReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureReservationRepository.findAllByEntityId(adventureId), typeToken.getType());
    }

    public AdventureReservationDto findById(Long id) {
        AdventureReservation adventureReservation = adventureReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdventureReservation", id));
        return modelMapper.map(adventureReservation, AdventureReservationDto.class);
    }

    @Transactional
    public AdventureReservationDto scheduleReservation(NewReservationDto newReservationDto, Long clientId) {
        try {
            Adventure adventure = adventureRepository.findByIdAndLock(newReservationDto.getEntityId());
            Client client = clientRepository.getById(clientId);

            if(client.getLoyaltyPoints()<=190)
                client.setLoyaltyPoints(client.getLoyaltyPoints() + 10);
            else client.setLoyaltyPoints(200);

            clientRepository.save(client);

            AdventureReservation adventureReservation = new AdventureReservation();
            adventureReservation.setEntity(adventure);
            adventureReservation.setPrice(newReservationDto.getPrice());
            adventureReservation.setNumberOfGuests(newReservationDto.getNumberOfGuests());
            adventureReservation.setReservationStart(newReservationDto.getReservationStart());
            adventureReservation.setReservationEnd(newReservationDto.getReservationEnd());
            adventureReservation.setClient(clientRepository.getById(newReservationDto.getClientId()));
            if (newReservationDto.getActionId() != null)
                adventureActionRepository.deleteById(newReservationDto.getActionId());
            try {
                emailService.sendAdventureReservationEmail(adventureReservation.getClient(), adventureReservation);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return modelMapper.map(adventureReservationRepository.save(adventureReservation), AdventureReservationDto.class);

        } catch (PessimisticLockingFailureException e) {
            throw new LockingFailureException();
        }
    }

    public List<AdventureDto> findAllAdventuresAvailableInPeriod(DatePeriodDto datePeriodDto) {
        List<Adventure> adventures = adventureRepository.findAll();
        // Filtrira tako da ostanu samo brodovi slobodne u tom periodu
        List<Adventure> availableAdventures = adventures.stream().filter(adventure ->
                dateService.isAdventureAvailableInPeriod(adventure, datePeriodDto.getStartDate(), datePeriodDto.getEndDate())
        ).collect(Collectors.toList());

        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(availableAdventures, typeToken.getType());
    }

    public void cancelReservation(Long reservationId) {
        adventureReservationRepository.deleteById(reservationId);
    }
}
