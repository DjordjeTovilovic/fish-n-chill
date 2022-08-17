package com.tim23.fishnchill.adventure.service;

import com.tim23.fishnchill.adventure.dto.AdventureDto;
import com.tim23.fishnchill.adventure.dto.NewAdventureDto;
import com.tim23.fishnchill.adventure.model.Adventure;
import com.tim23.fishnchill.adventure.repository.AdventureRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import com.tim23.fishnchill.user.model.AdventureOwner;
import com.tim23.fishnchill.user.repository.AdventureOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class AdventureService {

    private AdventureRepository adventureRepository;
    private ModelMapper modelMapper;
    private ImageRepository imageRepository;
    private AdventureOwnerRepository adventureOwnerRepository;
    private TagRepository tagRepository;
    private UnavailablePeriodRepository unavailablePeriodRepository;

    public Adventure addNewAdventureForOwner(Long ownerId, NewAdventureDto newAdventureDto) {

        AdventureOwner adventureOwner = adventureOwnerRepository.getById(ownerId);

        Adventure adventure = new Adventure();
        modelMapper.map(newAdventureDto, adventure);
        adventure.setOwner(adventureOwner);
        save(adventure);

        Image image = new Image();
        image.setUrl(newAdventureDto.getImage());
        image.setEntity(adventure);
        imageRepository.save(image);

        Tag tag = newAdventureDto.getTags();
        tag.setEntity(adventure);
        tagRepository.save(tag);


        return adventure;
    }

    public Adventure save(Adventure adventure) {

        return adventureRepository.save(adventure);
    }

    public void remove(Long id) {
        adventureRepository.deleteById(id);
    }

    @Transactional
    public Adventure update(AdventureDto newAdventure) {
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        Adventure adventure = adventureRepository.getById(newAdventure.getId());
        modelMapper.map(newAdventure, adventure);

        if (newAdventure.getAvailabilityStart() != null || newAdventure.getAvailabilityEnd() != null) {
            unavailablePeriodRepository.deleteAllByEntityId(newAdventure.getId());
        }

        return adventureRepository.save(adventure);
    }

    public List<AdventureDto> findAll() {
        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureRepository.findAll(), typeToken.getType());
    }


    public AdventureDto findById(Long id) {
        Adventure adventure = adventureRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Adventure", id));
        return modelMapper.map(adventure, AdventureDto.class);
    }


    public List<AdventureDto> findByNameContaining(String name) {
        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureRepository.findByNameContainingIgnoreCase(name), typeToken.getType());
    }

    public List<AdventureDto> findByDescriptionContaining(String description) {
        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureRepository.findByDescriptionContainingIgnoreCase(description), typeToken.getType());
    }

    public List<AdventureDto> findByAddressContaining(String address) {
        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureRepository.findByAddressContainingIgnoreCase(address), typeToken.getType());
    }

    public List<AdventureDto> findByAnything(String name, String address, String description) {
        TypeToken<List<AdventureDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(adventureRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(name, address, description), typeToken.getType());
    }
}
