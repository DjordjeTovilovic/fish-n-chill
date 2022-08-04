package com.tim23.fishnchill.reservation.service;

import com.tim23.fishnchill.cottage.CottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.service.DateService;
import com.tim23.fishnchill.reservation.dto.ClientCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.repository.CottageReservationRepository;
import com.tim23.fishnchill.user.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

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


    public List<CottageReservationDto> findAll() {
        TypeToken<List<CottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageReservationRepository.findAll(), typeToken.getType());
    }

    public List<ClientCottageReservationDto> findAllCottageReservationForClient(Long clientId) {
        TypeToken<List<ClientCottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageReservationRepository.findAllByClientId(clientId), typeToken.getType());
    }

    public List<CottageReservationDto> findAllReservationsForCottage(Long cottageId) {
        TypeToken<List<CottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageReservationRepository.findAllByCottageId(cottageId), typeToken.getType());
    }

    public CottageReservationDto findById(Long id) {
        CottageReservation cottageReservation = cottageReservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CottageReservation", id));
        return modelMapper.map(cottageReservation, CottageReservationDto.class);
    }

    public CottageReservationDto save(NewReservationDto newReservationDto) {
        CottageReservation cottageReservation = new CottageReservation();
        cottageReservation.setDuration(newReservationDto.getDuration());
        cottageReservation.setPrice(newReservationDto.getPrice());
        cottageReservation.setReservationStart(newReservationDto.getReservationStart());
        cottageReservation.setReservationEnd(newReservationDto.getReservationEnd());
        cottageReservation.setCottage(cottageRepository.getById(newReservationDto.getEntityId()));
        cottageReservation.setClient(clientRepository.getById(newReservationDto.getClientId()));
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
}
