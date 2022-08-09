package com.tim23.fishnchill.action.service;

import com.tim23.fishnchill.action.dto.CottageActionDto;
import com.tim23.fishnchill.action.dto.NewActionDto;
import com.tim23.fishnchill.action.model.CottageAction;
import com.tim23.fishnchill.action.repository.CottageActionRepository;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
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
        cottageAction.setPrice(newNewActionDto.getPrice());
        cottageAction.setReservationStart(newNewActionDto.getReservationStart());
        cottageAction.setReservationEnd(newNewActionDto.getReservationEnd());
        cottageAction.setActionEnd(newNewActionDto.getActionEnd());
        cottageAction.setCottage(cottageRepository.getById(newNewActionDto.getEntityId()));
//        try {
//            emailService.sendCottageReservationEmail(cottageReservation.getClient(), cottageReservation);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        return modelMapper.map(cottageActionRepository.save(cottageAction), CottageActionDto.class);
    }

    public void remove(Long id) {
        cottageRepository.deleteById(id);
    }
}
