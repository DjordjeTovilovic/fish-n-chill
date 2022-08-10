package com.tim23.fishnchill.boat;

import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class BoatService {

    private BoatRepository boatRepository;
    private ModelMapper modelMapper;

    public Boat update(BoatDto newBoat){
        Boat boat = boatRepository.getById(newBoat.getId());
        modelMapper.map(newBoat, boat);
        return boatRepository.save(boat);
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

    public List<BoatDto> findByAddressContaining(String address) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByAddressContainingIgnoreCase(address), typeToken.getType());
    }

    public List<BoatDto> findByDescriptionContaining(String description) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByDescriptionContainingIgnoreCase(description), typeToken.getType());
    }

    public List<BoatDto> findByAnything(String name, String address, String description) {
        TypeToken<List<BoatDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(boatRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(name, address, description), typeToken.getType());
    }
}
