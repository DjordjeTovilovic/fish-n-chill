package com.tim23.fishnchill.user.service;


import com.tim23.fishnchill.general.model.enums.UserResponseType;
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

    public UserResponseDto deleteAccountRequest (UserResponseDtoInfo userResponseDtoInfo){
        UserResponse userResponse = new UserResponse();
        userResponse.setExplanation(userResponseDtoInfo.getExplanation());
        userResponse.setUser(userRepository.getById(userResponseDtoInfo.getUserId()));
        userResponse.setApproved(false);
        userResponse.setResponseType(UserResponseType.ACCOUNTDELETIONREQUEST);
        return modelMapper.map(clientResponseRepository.save(userResponse), UserResponseDto.class);
    }
}
