package com.tim23.fishnchill.user.service;


import com.tim23.fishnchill.general.model.enums.ClientResponseType;
import com.tim23.fishnchill.user.dto.ClientResponseDto;
import com.tim23.fishnchill.user.dto.ClientResponseDtoInfo;
import com.tim23.fishnchill.user.model.ClientResponse;
import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.ClientResponseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ClientResponseService {
    private ClientResponseRepository clientResponseRepository;
    private ClientRepository clientRepository;
    private ModelMapper modelMapper;

    public ClientResponseDto deleteAccountRequest (ClientResponseDtoInfo clientResponseDtoInfo){
        ClientResponse clientResponse = new ClientResponse();
        clientResponse.setExplanation(clientResponseDtoInfo.getExplanation());
        clientResponse.setClient(clientRepository.getById(clientResponseDtoInfo.getClientId()));
        clientResponse.setApproved(false);
        clientResponse.setResponseType(ClientResponseType.ACCOUNTDELETIONREQUEST);
        return modelMapper.map(clientResponseRepository.save(clientResponse), ClientResponseDto.class);
    }
}
