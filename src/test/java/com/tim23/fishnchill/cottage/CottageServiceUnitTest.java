package com.tim23.fishnchill.cottage;

import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.cottage.service.CottageService;
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

    @BeforeEach
    void setUp() {
        cottageService = new CottageService(cottageRepository, modelMapper);
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
