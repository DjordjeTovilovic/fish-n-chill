package com.tim23.fishnchill.cottage.service;

import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.dto.NewCottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.general.exception.ResourceNotFoundException;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.user.model.CottageOwner;
import com.tim23.fishnchill.user.repository.CottageOwnerRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CottageService {

    private CottageRepository cottageRepository;
    private ModelMapper modelMapper;
    private ImageRepository imageRepository;
    private CottageOwnerRepository cottageOwnerRepository;
    private TagRepository tagRepository;

    public Cottage addNewCottageForOwner(Long ownerId, NewCottageDto newCottageDto) {

        CottageOwner cottageOwner = cottageOwnerRepository.getById(ownerId);

        Cottage cottage = new Cottage();
        modelMapper.map(newCottageDto, cottage);
        cottage.setOwner(cottageOwner);
        save(cottage);

        Image image = new Image();
        image.setUrl(newCottageDto.getImage());
        image.setEntity(cottage);
        imageRepository.save(image);
        System.out.println(newCottageDto.getTags().getAirCondition());
        System.out.println(newCottageDto.getTags().getTelevision());


        Tag tag = new Tag();
        tag = newCottageDto.getTags();
        tag.setEntity(cottage);
        tagRepository.save(tag);

        return cottage;
    }

    public Cottage save(Cottage cottage) {

        return cottageRepository.save(cottage);
    }

    public void remove(Long id) {
        cottageRepository.deleteById(id);
    }

    public Cottage update(CottageDto newCottage) {
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        Cottage cottage = cottageRepository.getById(newCottage.getId());
        modelMapper.map(newCottage, cottage);
        return cottageRepository.save(cottage);
    }

    public List<CottageDto> findAll() {
        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageRepository.findAll(), typeToken.getType());
    }


    public CottageDto findById(Long id) {
        Cottage cottage = cottageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cottage", id));
        return modelMapper.map(cottage, CottageDto.class);
    }


    public List<CottageDto> findByNameContaining(String name) {
        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageRepository.findByNameContainingIgnoreCase(name), typeToken.getType());
    }

    public List<CottageDto> findByDescriptionContaining(String description) {
        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageRepository.findByDescriptionContainingIgnoreCase(description), typeToken.getType());
    }

    public List<CottageDto> findByAddressContaining(String address) {
        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageRepository.findByAddressContainingIgnoreCase(address), typeToken.getType());
    }

    public List<CottageDto> findByAnything(String name, String address, String description) {
        TypeToken<List<CottageDto>> typeToken = new TypeToken<>() {};
        return modelMapper.map(cottageRepository.findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(name, address, description), typeToken.getType());
    }
}
