
package com.tim23.fishnchill.Student3;

import com.tim23.fishnchill.boat.dto.BoatDto;
import com.tim23.fishnchill.boat.repository.BoatRepository;
import com.tim23.fishnchill.boat.service.BoatService;
import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import com.tim23.fishnchill.user.repository.BoatOwnerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoatServiceUnitTest {

    private BoatService boatService;
    @Mock
    private BoatRepository boatRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private ImageRepository imageRepository;
    @Mock
    private BoatOwnerRepository boatOwnerRepository;
    @Mock
    private TagRepository tagRepository;
    @Mock
    private UnavailablePeriodRepository unavailablePeriodRepository;

    @BeforeEach
    void setUp() {
        boatService = new BoatService(boatRepository, modelMapper, imageRepository,boatOwnerRepository, tagRepository, unavailablePeriodRepository);
    }

    @Test
    void shouldFindAll() {
        boatService.findAll();
        verify(boatRepository).findAll();
    }

    @Test
    void shouldFindById() {
        Long id = 5L;
        Boat boat = new Boat();
        boat.setId(id);
        when(boatRepository.findById(id)).thenReturn(Optional.of(boat));
        BoatDto boatDto = boatService.findById(id);
        verify(boatRepository).findById(id);
    }

    @Test
    void shouldNotFindByOtherId() {
        Long id = 6L;
        Boat boat = new Boat();
        boat.setId(id);
        when(boatRepository.findById(id)).thenReturn(Optional.of(boat));
        BoatDto boatDto = boatService.findById(id);
        verify(boatRepository, never()).findById(5L);
    }

    @Test
    void shouldFindByName() {
        String name = "Boat 1";
        boatService.findByNameContaining(name);
        verify(boatRepository).findByNameContainingIgnoreCase(name);
    }

    @Test
    void shouldFindByDescription() {
        String description = "brod";
        boatService.findByDescriptionContaining(description);
        verify(boatRepository).findByDescriptionContainingIgnoreCase(description);
    }






}