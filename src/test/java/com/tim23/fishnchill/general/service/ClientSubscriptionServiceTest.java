package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.dto.ClientSubscriptionDto;
import com.tim23.fishnchill.general.dto.NewClientSubscriptionDto;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.ClientSubscription;
import com.tim23.fishnchill.general.model.enums.EntityType;
import com.tim23.fishnchill.general.repository.ClientSubscriptionRepository;
import com.tim23.fishnchill.user.model.Client;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ClientSubscriptionServiceTest {
    @Mock
    private ClientSubscriptionRepository clientSubscriptionRepository;
    @Mock
    private ModelMapper modelMapper;

    private ClientSubscriptionService underTest;

    @BeforeEach
    void setUp() {
        underTest = new ClientSubscriptionService(clientSubscriptionRepository, modelMapper);
    }

    @Test
    void shouldSubscribe() {
        //given
        NewClientSubscriptionDto newSubInfo = new NewClientSubscriptionDto(3L, 5L, EntityType.ADVENTURE);
        String type = "ADVENTURE";
        ClientSubscription clientSubscription = new ClientSubscription( 1L,EntityType.ADVENTURE, new BaseEntity(), new Client() );
        //when
        underTest.subscribe(newSubInfo);
        //then
        verify(clientSubscriptionRepository).subscribe(newSubInfo.getClientId(), newSubInfo.getEntityId(), type);
    }

    @Test
    void shouldExists() {
        //given
        NewClientSubscriptionDto newSubInfo = new NewClientSubscriptionDto(3L, 5L, EntityType.ADVENTURE);
        //when
        underTest.exists(newSubInfo);
        //then
        verify(clientSubscriptionRepository).existsByClientIdAndEntityId(newSubInfo.getClientId(), newSubInfo.getEntityId());
    }

    @Test
    void shouldUnsubscribe() {
        //given
        Long clientId = 2L;
        Long entityId = 1L;
        //when
        underTest.unsubscribe(clientId, entityId);
        //then
        verify(clientSubscriptionRepository).deleteByClientIdAndEntityId(clientId, entityId);
    }

    @Test
    void shouldFindAllByClientId() {
        //given
        Long clientId = 1L;
        TypeToken<List<ClientSubscriptionDto>> typeToken = new TypeToken<>(){};
        List<ClientSubscription> clientSubscriptions;
        //when
        underTest.findAllByClientId(clientId);
        //then
        verify(modelMapper).map(clientSubscriptionRepository.findAllByClientId(clientId), typeToken.getType());
    }
}