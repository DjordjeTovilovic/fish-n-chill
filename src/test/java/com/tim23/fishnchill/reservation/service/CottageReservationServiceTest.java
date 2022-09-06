package com.tim23.fishnchill.reservation.service;

import com.tim23.fishnchill.action.repository.CottageActionRepository;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.general.service.DateService;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.dto.ClientCottageReservationDto;
import com.tim23.fishnchill.reservation.dto.CottageReservationDto;
import com.tim23.fishnchill.reservation.dto.NewReservationDto;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import com.tim23.fishnchill.reservation.repository.CottageReservationRepository;
import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class CottageReservationServiceTest {
    @Mock
    private CottageReservationRepository cottageReservationRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private CottageRepository cottageRepository;
    @Mock
    private ClientRepository clientRepository;
    @Mock
    private DateService dateService;
    @Mock
    private MailService emailService;
    @Mock
    private UserResponseRepository userResponseRepository;
    @Mock
    private CottageActionRepository cottageActionRepository;

    private CottageReservationService underTest;

    @BeforeEach
    void setUp() {
        underTest = new CottageReservationService(
                cottageReservationRepository,
                modelMapper,
                cottageRepository,
                clientRepository,
                dateService,
                emailService,
                userResponseRepository,
                cottageActionRepository
        );
    }

    @Test
    void shouldFindAllActiveCottageReservationForClient() {
        //given
        Long clientId = 3L;
        TypeToken<List<ClientCottageReservationDto>> typeToken = new TypeToken<>() {};
        //when
        underTest.findAllCottageReservationForClient(clientId, true);
        //then
        verify(modelMapper).map(cottageReservationRepository.findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(clientId, LocalDateTime.now()), typeToken.getType());
    }

    @Test
    void shouldScheduleReservation() {
        //given
        NewReservationDto newReservationDto = new NewReservationDto();
        Long clientId = 1L;
        CottageReservation cottageReservation = new CottageReservation();
        cottageReservation.setClient(clientRepository.getById(clientId));
        //when
        underTest.scheduleReservation(newReservationDto, clientId);
        //then
        verify(modelMapper).map(cottageReservationRepository.save(cottageReservation), CottageReservationDto.class);
    }

    @Test
    void shouldCancelReservation() {
        //given
        Long reservationId = 3L;
        //when
        underTest.cancelReservation(reservationId);
        //then
        verify(cottageReservationRepository).deleteById(reservationId);
    }
}