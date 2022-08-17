package com.tim23.fishnchill.cottage;

import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.cottage.repository.RoomRepository;
import com.tim23.fishnchill.cottage.service.CottageService;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import com.tim23.fishnchill.user.repository.CottageOwnerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CottageServiceUnitTest {

    @Mock
    private CottageRepository cottageRepository;
    @Mock
    private ModelMapper modelMapper;
    private CottageService cottageService;
    private ImageRepository imageRepository;
    private CottageOwnerRepository cottageOwnerRepository;
    private TagRepository tagRepository;
    private RoomRepository roomRepository;
    private UnavailablePeriodRepository unavailablePeriodRepository;

    @BeforeEach
    void setUp() {
        cottageService = new CottageService(cottageRepository, modelMapper,
                imageRepository, cottageOwnerRepository, tagRepository, roomRepository, unavailablePeriodRepository);
    }

    @Test
    void shouldFindAll() {
        cottageService.findAll();
        verify(cottageRepository).findAll();
    }

    @Test
    void shouldFindById() {
        // Izmijeniti ovaj test
        Long id = 1L;
        Cottage cottage = new Cottage();
        cottage.setId(id);
        when(cottageRepository.findById(id)).thenReturn(Optional.of(cottage));
        CottageDto cottageDto = cottageService.findById(id);
        verify(cottageRepository).findById(id);
    }

    @Test
    void shouldFindByName() {
        String name = "CottageName";
        cottageService.findByNameContaining(name);
        verify(cottageRepository).findByNameContainingIgnoreCase(name);
    }
}
