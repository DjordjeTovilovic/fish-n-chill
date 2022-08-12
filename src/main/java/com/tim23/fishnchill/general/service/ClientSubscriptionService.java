package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.dto.ClientSubscriptionDto;
import com.tim23.fishnchill.general.dto.NewClientSubscriptionDto;
import com.tim23.fishnchill.general.model.ClientSubscription;
import com.tim23.fishnchill.general.model.enums.EntityType;
import com.tim23.fishnchill.general.repository.ClientSubscriptionRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ClientSubscriptionService {
    private ClientSubscriptionRepository clientSubscriptionRepository;
    private ModelMapper modelMapper;

    public ClientSubscriptionDto subscribe(NewClientSubscriptionDto newSubInfo) {
        String type;
        switch (newSubInfo.getType()) {
            case COTTAGE : type="COTTAGE";
                break;
            case BOAT: type="BOAT";
                break;
            case ADVENTURE: type="ADVENTURE";
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + newSubInfo.getType());
        }
        clientSubscriptionRepository.subscribe(newSubInfo.getClientId(), newSubInfo.getEntityId(), type);
        ClientSubscription newSub = clientSubscriptionRepository.findClientSubscriptionByClientIdAndEntityId(newSubInfo.getClientId(), newSubInfo.getEntityId());
        return modelMapper.map(newSub, ClientSubscriptionDto.class);
    }

    public boolean exists(NewClientSubscriptionDto newSubInfo) {
        return clientSubscriptionRepository.existsByClientIdAndEntityId(newSubInfo.getClientId(), newSubInfo.getEntityId());
    }

    public void unsubscribe(Long clientId, Long entityId) {
        clientSubscriptionRepository.deleteByClientIdAndEntityId(clientId, entityId);
    }

    public List<ClientSubscriptionDto> findAllByClientId(Long clientId) {
        TypeToken<List<ClientSubscriptionDto>> typeToken = new TypeToken<>(){};
        return modelMapper.map(clientSubscriptionRepository.findAllByClientId(clientId), typeToken.getType());
    }
}
