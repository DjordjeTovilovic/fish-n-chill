package com.tim23.fishnchill.boat.service;

import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.boat.dto.NewBoatDto;
import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.boat.model.BoatSpecification;
import com.tim23.fishnchill.boat.repository.BoatRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import com.tim23.fishnchill.user.model.BoatOwner;
import com.tim23.fishnchill.user.repository.BoatOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class BoatService {

    private BoatRepository boatRepository;
    private ModelMapper modelMapper;
    private ImageRepository imageRepository;
    private BoatOwnerRepository boatOwnerRepository;
    private TagRepository tagRepository;
    private UnavailablePeriodRepository unavailablePeriodRepository;

    public Boat addNewBoatForOwner(Long ownerId, NewBoatDto newBoatDto) {

        BoatOwner boatOwner = boatOwnerRepository.getById(ownerId);

        BoatSpecification boatSpecification = new BoatSpecification();
        modelMapper.map(newBoatDto, boatSpecification);

        Boat boat = new Boat();
        modelMapper.map(newBoatDto, boat);
        boat.setOwner(boatOwner);
        boat.setBoatSpecification(boatSpecification);
        save(boat);

        Image image = new Image();
        image.setUrl(newBoatDto.getImage());
        image.setEntity(boat);
        imageRepository.save(image);

        Tag tag = newBoatDto.getTags();
        tag.setEntity(boat);
        tagRepository.save(tag);

        return boat;
    }

    public Boat save(Boat boat) {

        return boatRepository.save(boat);
    }

    public void remove(Long id) {
        boatRepository.deleteById(id);
    }

    @Transactional
    public Boat update(BoatDto newBoat) {
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        Boat boat = boatRepository.getById(newBoat.getId());
        modelMapper.map(newBoat, boat);

        if (newBoat.getAvailabilityStart() != null || newBoat.getAvailabilityEnd() != null) {
            unavailablePeriodRepository.deleteAllByEntityId(newBoat.getId());
        }

        return boatRepository.save(boat);
    }

    public Boat patch(Long boatId, NewBoatDto boatDto) {

        Boat boat = boatRepository.getById(boatId);
        BoatSpecification boatSpecification = boat.getBoatSpecification();
        Long boatSpecificationId = boatSpecification.getId();
        modelMapper.map(boatDto, boatSpecification);
        boatSpecification.setId(boatSpecificationId);

        modelMapper.map(boatDto, boat);
        boat.setBoatSpecification(boatSpecification);
        boat.setId(boatId);
        save(boat);

        return boat;
    }

    public List<BoatDto> findAll() {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findAll(), typeToken.getType());
    }


    public BoatDto findById(Long id) {
        Boat boat = boatRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Boat", id));
        return modelMapper.map(boat, BoatDto.class);
    }


    public List<BoatDto> findByNameContaining(String name) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByNameContainingIgnoreCase(name), typeToken.getType());
    }

    public List<BoatDto> findByDescriptionContaining(String description) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByDescriptionContainingIgnoreCase(description), typeToken.getType());
    }

    public List<BoatDto> findByAddressContaining(String address) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByAddressContainingIgnoreCase(address), typeToken.getType());
    }

    public List<BoatDto> findByAnything(String name, String address, String description) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(name, address, description), typeToken.getType());
    }
}
