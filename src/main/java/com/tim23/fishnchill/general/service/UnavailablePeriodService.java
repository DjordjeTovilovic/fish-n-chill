package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.dto.NewUnavailablePeriodDto;
import com.tim23.fishnchill.general.dto.UnavailablePeriodDto;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.model.UnavailablePeriod;
import com.tim23.fishnchill.general.repository.BaseEntityRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UnavailablePeriodService {

    private ModelMapper modelMapper;
    private UnavailablePeriodRepository unavailablePeriodRepository;
    private BaseEntityRepository baseEntityRepository;

    public List<UnavailablePeriodDto> findAllUnavailablePeriodsForEntity(Long entityId) {
        TypeToken<List<UnavailablePeriodDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(unavailablePeriodRepository.findAllByEntityId(entityId), typeToken.getType());
    }

    public void deleteAllForEntity(Long entityId) {
        unavailablePeriodRepository.deleteAllByEntityId(entityId);
    }

    public UnavailablePeriodDto save(NewUnavailablePeriodDto newUnavailablePeriodDto) {
        UnavailablePeriod unavailablePeriod = new UnavailablePeriod();
        unavailablePeriod.setStartDate(newUnavailablePeriodDto.getStartDate());
        unavailablePeriod.setEndDate(newUnavailablePeriodDto.getEndDate());
        BaseEntity baseEntity = baseEntityRepository.findBaseEntityById(newUnavailablePeriodDto.getEntityId());
        unavailablePeriod.setEntity(baseEntity);
        return modelMapper.map(unavailablePeriodRepository.save(unavailablePeriod), UnavailablePeriodDto.class);
    }
}
