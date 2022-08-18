package com.tim23.fishnchill.action.service;

import com.tim23.fishnchill.action.dto.BoatActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.model.BoatAction;
import com.tim23.fishnchill.action.repository.BoatActionRepository;
import com.tim23.fishnchill.boat.repository.BoatRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.ClientSubscription;
import com.tim23.fishnchill.general.repository.ClientSubscriptionRepository;
import com.tim23.fishnchill.general.service.MailService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BoatActionService {
    private BoatRepository boatRepository;
    private BoatActionRepository boatActionRepository;
    private ModelMapper modelMapper;
    private MailService mailService;
    private ClientSubscriptionRepository clientSubscriptionRepository;

    public List<BoatActionDto> findAll() {
        TypeToken<List<BoatActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatActionRepository.findAll(), typeToken.getType());
    }

    public List<BoatActionDto> findAllActiveActions() {
        TypeToken<List<BoatActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatActionRepository.findAllActiveActions(), typeToken.getType());
    }

    public BoatActionDto findById(Long id) {
        BoatAction boatAction = boatActionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BoatAction", id));
        return modelMapper.map(boatAction, BoatActionDto.class);
    }

    public BoatActionDto save(NewActionDto newNewActionDto) {
        BoatAction boatAction = new BoatAction();
        boatAction.setActionPrice(newNewActionDto.getActionPrice());
        boatAction.setActualPrice(newNewActionDto.getActualPrice());
        boatAction.setNumberOfGuests(newNewActionDto.getNumberOfGuests());
        boatAction.setReservationStart(newNewActionDto.getReservationStart());
        boatAction.setReservationEnd(newNewActionDto.getReservationEnd());
        boatAction.setActionEnd(newNewActionDto.getActionEnd());
        boatAction.setEntity(boatRepository.getById(newNewActionDto.getEntityId()));
        clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());
        BoatActionDto boatActionDto = modelMapper.map(boatActionRepository.save(boatAction), BoatActionDto.class);

        List<ClientSubscription> allSubs = clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());

        for(ClientSubscription sub : allSubs)
        {
            mailService.sendNewBoatActionEmail(sub.getClient(), boatAction);
        }
        return boatActionDto;
    }

    public void remove(Long id) {
        boatRepository.deleteById(id);
    }

    public boolean checkIfExist() {
        return boatActionRepository.existsBy();
    }
}
