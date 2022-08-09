package com.tim23.fishnchill.user.service;


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
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserResponseService {
    private UserResponseRepository userResponseRepository;
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private ReservationRepository reservationRepository;
    private BaseEntityRepository baseEntityRepository;
    private MailService mailService;

    public UserResponseDto deleteAccountRequest (UserResponseDtoInfo userResponseDtoInfo){
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

    public void approveAccountDeletionRequest(Long accDelReqId) throws InterruptedException {
        User user = userResponseRepository.getById(accDelReqId).getUser();
        mailService.sendAccountDeletionEmail(user);
        userResponseRepository.deleteById(accDelReqId);
    }
    public void approveClientRevision(Long accDelReqId) throws InterruptedException{
        User owner = userResponseRepository.getById(accDelReqId).getOwner();
        User client = userResponseRepository.getById(accDelReqId).getUser();
        String revision = userResponseRepository.getById(accDelReqId).getExplanation();
        BaseEntity entity = userResponseRepository.getById(accDelReqId).getEntity();
        Reservation reservation = userResponseRepository.getById(accDelReqId).getReservation();
        mailService.sendClientRevisionEmail(owner, client, revision, entity, reservation);
        userResponseRepository.deleteById(accDelReqId);
    }
    public void answerClientComplaint(Long accDelReqId, String answer) throws InterruptedException{
        User owner = userResponseRepository.getById(accDelReqId).getOwner();
        User client = userResponseRepository.getById(accDelReqId).getUser();
        String complaint = userResponseRepository.getById(accDelReqId).getExplanation();
        BaseEntity entity = userResponseRepository.getById(accDelReqId).getEntity();
        Reservation reservation = userResponseRepository.getById(accDelReqId).getReservation();
        mailService.sendAnswerToClientComplaintEmail(owner, client, answer, complaint, entity, reservation);
        userResponseRepository.deleteById(accDelReqId);
    }
}
