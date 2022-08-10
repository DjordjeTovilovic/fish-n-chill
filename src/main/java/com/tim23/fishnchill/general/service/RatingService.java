package com.tim23.fishnchill.general.service;

import com.tim23.fishnchill.general.dto.RatingDto;
import com.tim23.fishnchill.general.dto.RatingInfoDto;
import com.tim23.fishnchill.general.model.BaseEntity;
import com.tim23.fishnchill.general.repository.BaseEntityRepository;
import com.tim23.fishnchill.general.repository.RatingRepository;
import com.tim23.fishnchill.user.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class RatingService {

    private ClientRepository clientRepository;
    private RatingRepository ratingRepository;
    private ModelMapper modelMapper;
    private BaseEntityRepository baseEntityRepository;

    public List<RatingDto> getAllRatingsByClientId(Long clientId) {
        TypeToken<List<RatingDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(ratingRepository.findByClientId(clientId), typeToken.getType());
    }


    public void rate(RatingInfoDto ratingInfo) {
        if (ratingRepository.existsByClientIdAndEntityId(ratingInfo.getClient_id(), ratingInfo.getEntity_id()))
            ratingRepository.updateRateEntity(ratingInfo.getRating(), ratingInfo.getClient_id(), ratingInfo.getEntity_id());
        else
            ratingRepository.rateEntity(ratingInfo.getRating(), ratingInfo.getClient_id(), ratingInfo.getEntity_id());

        Integer ratingCount = ratingRepository.getRatingCountForEntity(ratingInfo.getEntity_id());
        Float ratingAverage = ratingRepository.getRatingAverageForEntity(ratingInfo.getEntity_id());
        BaseEntity entity = baseEntityRepository.findBaseEntityById(ratingInfo.getEntity_id());
        entity.setRatingCount(ratingCount);
        entity.setRatingAverage(ratingAverage);
        baseEntityRepository.save(entity);
    }
}
