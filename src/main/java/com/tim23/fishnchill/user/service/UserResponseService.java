package com.tim23.fishnchill.user.service;


import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.general.repository.BaseEntityRepository;
import com.tim23.fishnchill.reservation.repository.ReservationRepository;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.dto.UserResponseDtoInfo;
import com.tim23.fishnchill.user.model.UserResponse;
import com.tim23.fishnchill.user.repository.UserRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserResponseService {
    private UserResponseRepository clientResponseRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private ReservationRepository reservationRepository;
    private BaseEntityRepository baseEntityRepository;

    public UserResponseDto deleteAccountRequest (UserResponseDtoInfo userResponseDtoInfo){
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setApproved(false);
        userResponse.setResponseType(UserResponseType.ACCOUNTDELETIONREQUEST);
        return modelMapper.map(clientResponseRepository.save(userResponse), UserResponseDto.class);
    }

    public UserResponseDto writeComplaint(UserResponseDtoInfo userResponseDtoInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setOwner(userRepository.getById(userResponseDtoInfo.getOwnerId()));
        userResponse.setReservation(reservationRepository.getById(userResponseDtoInfo.getReservationId()));
        userResponse.setEntity(baseEntityRepository.getById(userResponseDtoInfo.getEntityId()));
        userResponse.setApproved(false);
        userResponse.setResponseType(UserResponseType.COMPLAINT);
        return modelMapper.map(clientResponseRepository.save(userResponse), UserResponseDto.class);
    }

    public UserResponseDto writeRevision(UserResponseDtoInfo userResponseDtoInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setOwner(userRepository.getById(userResponseDtoInfo.getOwnerId()));
        userResponse.setReservation(reservationRepository.getById(userResponseDtoInfo.getReservationId()));
        userResponse.setEntity(baseEntityRepository.getById(userResponseDtoInfo.getEntityId()));
        userResponse.setApproved(false);
        userResponse.setResponseType(UserResponseType.REVISION);
        return modelMapper.map(clientResponseRepository.save(userResponse), UserResponseDto.class);
    }
}
