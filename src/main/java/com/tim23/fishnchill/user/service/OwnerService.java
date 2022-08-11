package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.reservation.dto.ClientCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageOwnerCottageReservationDto;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.reservation.repository.CottageReservationRepository;
import com.tim23.fishnchill.user.model.CottageOwner;
import com.tim23.fishnchill.user.repository.CottageOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class OwnerService {
    private ModelMapper modelMapper;
    private CottageOwnerRepository cottageOwnerRepository;
    private CottageReservationRepository cottageReservationRepository;

    public List<CottageOwnerCottageReservationDto> findAllActiveCottageOwnerReservations(Long ownerId) {
        CottageOwner owner = cottageOwnerRepository.getById(ownerId);
        List<Reservation> reservations = new ArrayList<>();
        owner.getEntities().forEach(cottage -> reservations.addAll(cottageReservationRepository
                .findAllByEntityIdAndReservationStartBeforeAndReservationEndAfter(cottage.getId(), LocalDateTime.now(), LocalDateTime.now()))
        );

        TypeToken<List<CottageOwnerCottageReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(reservations, typeToken.getType());
    }
}
