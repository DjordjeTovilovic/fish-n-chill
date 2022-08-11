package com.tim23.fishnchill.action.service;

import com.tim23.fishnchill.action.dto.CottageActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.model.CottageAction;
import com.tim23.fishnchill.action.repository.CottageActionRepository;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
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
public class CottageActionService {
    private CottageRepository cottageRepository;
    private CottageActionRepository cottageActionRepository;
    private ModelMapper modelMapper;
    private MailService mailService;
    private ClientSubscriptionRepository clientSubscriptionRepository;

    public List<CottageActionDto> findAll() {
        TypeToken<List<CottageActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageActionRepository.findAll(), typeToken.getType());
    }

    public List<CottageActionDto> findAllActiveActions() {
        TypeToken<List<CottageActionDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageActionRepository.findAllActiveActions(), typeToken.getType());
    }

    public CottageActionDto findById(Long id) {
        CottageAction cottageAction = cottageActionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CottageAction", id));
        return modelMapper.map(cottageAction, CottageActionDto.class);
    }

    public CottageActionDto save(NewActionDto newNewActionDto) {
        CottageAction cottageAction = new CottageAction();
        cottageAction.setActionPrice(newNewActionDto.getActionPrice());
        cottageAction.setActualPrice(newNewActionDto.getActualPrice());
        cottageAction.setNumberOfGuests(newNewActionDto.getNumberOfGuests());
        cottageAction.setReservationStart(newNewActionDto.getReservationStart());
        cottageAction.setReservationEnd(newNewActionDto.getReservationEnd());
        cottageAction.setActionEnd(newNewActionDto.getActionEnd());
        cottageAction.setEntity(cottageRepository.getById(newNewActionDto.getEntityId()));
        clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());
        CottageActionDto cottageActionDto = modelMapper.map(cottageActionRepository.save(cottageAction), CottageActionDto.class);

        List<ClientSubscription> allSubs = clientSubscriptionRepository.findAllByEntityId(newNewActionDto.getEntityId());

        for(ClientSubscription sub : allSubs)
        {
            mailService.sendNewCottageActionEmail(sub.getClient(), cottageAction);
        }
         return cottageActionDto;
    }

    public void remove(Long id) {
        cottageRepository.deleteById(id);
    }

    public boolean checkIfExist() {
        return cottageActionRepository.existsBy();
    }
}
