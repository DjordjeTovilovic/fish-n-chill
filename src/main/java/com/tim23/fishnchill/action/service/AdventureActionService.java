package com.tim23.fishnchill.action.service;

import com.tim23.fishnchill.action.dto.AdventureActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.model.AdventureAction;
import com.tim23.fishnchill.action.repository.AdventureActionRepository;
import com.tim23.fishnchill.adventure.repository.AdventureRepository;
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
public class AdventureActionService {
    private AdventureRepository adventureRepository;
    private AdventureActionRepository adventureActionRepository;
    private ModelMapper modelMapper;
    private MailService mailService;
    private ClientSubscriptionRepository clientSubscriptionRepository;

    public List<AdventureActionDto> findAll() {
        TypeToken<List<AdventureActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureActionRepository.findAll(), typeToken.getType());
    }

    public List<AdventureActionDto> findAllActiveActions() {
        TypeToken<List<AdventureActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureActionRepository.findAllActiveActions(), typeToken.getType());
    }

    public AdventureActionDto findById(Long id) {
        AdventureAction adventureAction = adventureActionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdventureAction", id));
        return modelMapper.map(adventureAction, AdventureActionDto.class);
    }

    public AdventureActionDto save(NewActionDto newNewActionDto) {
        AdventureAction adventureAction = new AdventureAction();
        adventureAction.setActionPrice(newNewActionDto.getActionPrice());
        adventureAction.setActualPrice(newNewActionDto.getActualPrice());
        adventureAction.setNumberOfGuests(newNewActionDto.getNumberOfGuests());
        adventureAction.setReservationStart(newNewActionDto.getReservationStart());
        adventureAction.setReservationEnd(newNewActionDto.getReservationEnd());
        adventureAction.setActionEnd(newNewActionDto.getActionEnd());
        adventureAction.setEntity(adventureRepository.getById(newNewActionDto.getEntityId()));
        clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());
        AdventureActionDto adventureActionDto = modelMapper.map(adventureActionRepository.save(adventureAction), AdventureActionDto.class);

        List<ClientSubscription> allSubs = clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());

        for(ClientSubscription sub : allSubs)
        {
            mailService.sendNewAdventureActionEmail(sub.getClient(), adventureAction);
        }
        return adventureActionDto;
    }

    public void remove(Long id) {
        adventureRepository.deleteById(id);
    }

    public boolean checkIfExist() {
        return adventureActionRepository.existsBy();
    }
}
