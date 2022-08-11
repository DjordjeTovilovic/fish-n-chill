package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.dto.ClientSubscriptionDto;
import com.tim23.fishnchill.general.dto.NewClientSubscriptionDto;
import com.tim23.fishnchill.general.model.ClientSubscription;
import com.tim23.fishnchill.general.repository.ClientSubscriptionRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ClientSubscriptionService {
    private ClientSubscriptionRepository clientSubscriptionRepository;
    private ModelMapper modelMapper;

    public ClientSubscriptionDto subscribe(NewClientSubscriptionDto newSubInfo) {
        clientSubscriptionRepository.subscribe(newSubInfo.getClientId(), newSubInfo.getEntityId());
        ClientSubscription newSub = clientSubscriptionRepository.findClientSubscriptionByClientIdAndEntityId(newSubInfo.getClientId(), newSubInfo.getEntityId());
        return modelMapper.map(newSub, ClientSubscriptionDto.class);
    }

    public boolean exists(NewClientSubscriptionDto newSubInfo) {
        return clientSubscriptionRepository.existsByClientIdAndEntityId(newSubInfo.getClientId(), newSubInfo.getEntityId());
    }

    public void unsubscribe(Long clientId, Long entityId) {
        clientSubscriptionRepository.deleteByClientIdAndEntityId(clientId, entityId);
    }
}
