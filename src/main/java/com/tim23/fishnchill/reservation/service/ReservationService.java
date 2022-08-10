package com.tim23.fishnchill.reservation.service;

import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.reservation.repository.ReservationRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ReservationService {

    private ModelMapper modelMapper;
    private ReservationRepository reservationRepository;


    public List<NewReservationDto> findAll() {
        TypeToken<List<NewReservationDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(reservationRepository.findAll(), typeToken.getType());
    }

    public NewReservationDto findById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation", id));
        return modelMapper.map(reservation, NewReservationDto.class);
    }

    public void cancelReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}
