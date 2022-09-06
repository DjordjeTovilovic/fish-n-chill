package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.general.repository.BaseEntityRepository;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.repository.ReservationRepository;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.dto.UserResponseDtoInfo;
import com.tim23.fishnchill.user.model.UserResponse;
import com.tim23.fishnchill.user.repository.UserRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserResponseServiceTest {
    @Mock
    private UserResponseRepository userResponseRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private ReservationRepository reservationRepository;
    @Mock
    private BaseEntityRepository baseEntityRepository;
    @Mock
    private MailService mailService;
    @Mock
    private UserService userService;

    UserResponseService underTest;

    @BeforeEach
    void setUp() {
        underTest = new UserResponseService(userResponseRepository, userRepository, modelMapper, reservationRepository, baseEntityRepository, mailService, userService);
    }

    @Test
    void shouldDeleteAccountRequest() {
        //given
        UserResponseDtoInfo userResponseDtoInfo = new UserResponseDtoInfo("some explanation", 3L, null, null, null);
        //when
        underTest.deleteAccountRequest(userResponseDtoInfo);
        //then
        UserResponse userResponse = new UserResponse();
        verify(modelMapper).map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }

    @Test
    void shouldWriteComplaint() {
        //given
        UserResponseDtoInfo userResponseDtoInfo = new UserResponseDtoInfo("some explanation", 3L, 1L, 2L, 1L);
        //when
        underTest.writeComplaint(userResponseDtoInfo);
        //then
        UserResponse userResponse = new UserResponse();
        verify(modelMapper).map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }

    @Test
    void shouldWriteRevision() {
        //given
        UserResponseDtoInfo userResponseDtoInfo = new UserResponseDtoInfo("some explanation", 3L, 1L, 2L, 1L);
        //when
        underTest.writeRevision(userResponseDtoInfo);
        //then
        UserResponse userResponse = new UserResponse();
        verify(modelMapper).map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }
}