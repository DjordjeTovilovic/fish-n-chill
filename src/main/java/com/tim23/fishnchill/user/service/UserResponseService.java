package com.tim23.fishnchill.user.service;


import com.tim23.fishnchill.general.exception.LockingFailureException;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.general.repository.BaseEntityRepository;
import com.tim23.fishnchill.general.service.MailService;
import com.tim23.fishnchill.reservation.model.Reservation;
import com.tim23.fishnchill.reservation.repository.ReservationRepository;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.dto.UserResponseDtoInfo;
import com.tim23.fishnchill.user.model.User;
import com.tim23.fishnchill.user.model.UserResponse;
import com.tim23.fishnchill.user.repository.UserRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.dao.PessimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.List;

@AllArgsConstructor
@Service
public class UserResponseService {
    private UserResponseRepository userResponseRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private ReservationRepository reservationRepository;
    private BaseEntityRepository baseEntityRepository;
    private MailService mailService;
    private UserService userService;



    public List<UserResponseDto> getAll(){
        Type listType = new TypeToken<List<UserResponseDto>>(){}.getType();
        List<UserResponseDto> userResponseDtos = modelMapper.map(userResponseRepository.findAll(),listType);
        return userResponseDtos;
    }

    public UserResponseDto deleteAccountRequest(UserResponseDtoInfo userResponseDtoInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setResponseType(UserResponseType.ACCOUNTDELETIONREQUEST);
        return modelMapper.map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }

    public UserResponseDto writeComplaint(UserResponseDtoInfo userResponseDtoInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setOwner(userRepository.getById(userResponseDtoInfo.getOwnerId()));
        userResponse.setReservation(reservationRepository.getById(userResponseDtoInfo.getReservationId()));
        userResponse.setEntity(baseEntityRepository.getById(userResponseDtoInfo.getEntityId()));
        userResponse.setResponseType(UserResponseType.COMPLAINT);
        return modelMapper.map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }

    public UserResponseDto writeRevision(UserResponseDtoInfo userResponseDtoInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setOwner(userRepository.getById(userResponseDtoInfo.getOwnerId()));
        userResponse.setReservation(reservationRepository.getById(userResponseDtoInfo.getReservationId()));
        userResponse.setEntity(baseEntityRepository.getById(userResponseDtoInfo.getEntityId()));
        userResponse.setResponseType(UserResponseType.REVISION);
        return modelMapper.map(userResponseRepository.save(userResponse), UserResponseDto.class);
    }
    @Transactional
    public void approveAccountDeletionRequest(Long id) {
        try {
            UserResponse userResponse = userResponseRepository.findByIdAndLock(id);
            User user = userResponse.getUser();
            mailService.sendAccountDeletionEmail(user);
            userResponseRepository.deleteById(id);
            userService.deleteUserById(user.getId());
        }catch (PessimisticLockingFailureException e) {
            throw new LockingFailureException();
        }
    }

    public void deleteResponse(Long id){
        userResponseRepository.deleteById(id);
    }


    @Transactional
    public void approveClientRevision(Long id) {
        try {
            UserResponse userResponse = userResponseRepository.findByIdAndLock(id);
            User owner = userResponse.getOwner();
            User client = userResponse.getUser();
            String revision = userResponse.getExplanation();
            BaseEntity entity = userResponse.getEntity();
            Reservation reservation = userResponse.getReservation();

            mailService.sendClientRevisionEmail(owner, client, revision, entity, reservation);
            userResponseRepository.deleteById(id);
        }catch (PessimisticLockingFailureException e) {
            throw new LockingFailureException();
        }
    }
    @Transactional
    public void answerClientComplaint(Long id, String answer) {
        try{
            UserResponse userResponse = userResponseRepository.findByIdAndLock(id);
            User owner = userResponse.getOwner();
            User client = userResponse.getUser();
            String complaint = userResponse.getExplanation();
            BaseEntity entity = userResponse.getEntity();
            Reservation reservation = userResponse.getReservation();

            mailService.sendAnswerToClientComplaintEmail(owner, client, answer, complaint, entity, reservation);
            userResponseRepository.deleteById(id);
        }catch (PessimisticLockingFailureException e) {
            throw new LockingFailureException();
        }
    }
}
