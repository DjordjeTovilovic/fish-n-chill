package com.tim23.fishnchill.Student2;

import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.dto.NewCottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.cottage.repository.CottageRepository;
import com.tim23.fishnchill.cottage.repository.RoomRepository;
import com.tim23.fishnchill.cottage.service.CottageService;
import com.tim23.fishnchill.general.model.Image;
import com.tim23.fishnchill.general.model.Tag;
import com.tim23.fishnchill.general.repository.ImageRepository;
import com.tim23.fishnchill.general.repository.TagRepository;
import com.tim23.fishnchill.general.repository.UnavailablePeriodRepository;
import com.tim23.fishnchill.user.dto.UserResponseDto;
import com.tim23.fishnchill.user.model.CottageOwner;
import com.tim23.fishnchill.user.repository.CottageOwnerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CottageServiceUnitTest {

    private CottageService cottageService;
    @Mock
    private CottageRepository cottageRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private ImageRepository imageRepository;
    @Mock
    private CottageOwnerRepository cottageOwnerRepository;
    @Mock
    private TagRepository tagRepository;
    @Mock
    private RoomRepository roomRepository;
    @Mock
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
        Long id = 1L;
        Cottage cottage = new Cottage();
        cottage.setId(id);
        when(cottageRepository.findById(id)).thenReturn(Optional.of(cottage));
        CottageDto cottageDto = cottageService.findById(id);
        verify(cottageRepository).findById(id);
    }

    @Test
    void shouldNotFindByOtherId() {
        Long id = 2L;
        Cottage cottage = new Cottage();
        cottage.setId(id);
        when(cottageRepository.findById(id)).thenReturn(Optional.of(cottage));
        CottageDto cottageDto = cottageService.findById(id);
        verify(cottageRepository, never()).findById(1L);
    }

    @Test
    void shouldFindByName() {
        String name = "CottageName";
        cottageService.findByNameContaining(name);
        verify(cottageRepository).findByNameContainingIgnoreCase(name);
    }

    @Test
    void shouldFindByDescription() {
        String description = "Description";
        cottageService.findByDescriptionContaining(description);
        verify(cottageRepository).findByDescriptionContainingIgnoreCase(description);
    }

    @Test
    void createNewCottageShouldGetProperOwner() {
        Long ownerId = 1L;
        NewCottageDto cottageDto = new NewCottageDto();
        cottageDto.setOwnerId(ownerId);
        cottageService.addNewCottageForOwner(cottageDto);

        verify(cottageOwnerRepository).getById(ownerId);
    }

    @Test
    void createNewCottageShouldSaveImageIfItsNotNull() {
        NewCottageDto cottageDto = new NewCottageDto();
        String image = "url";
        cottageDto.setImage(image);
        cottageService.addNewCottageForOwner(cottageDto);

        verify(imageRepository, times(1)).save(any());

    }

    @Test
    void createNewCottageShouldNotSaveImageIfItsNull() {
        NewCottageDto cottageDto = new NewCottageDto();
        cottageService.addNewCottageForOwner(cottageDto);

        verify(imageRepository, never()).save(any());
    }

    @Test
    void createNewCottageShouldSaveTagIfItsNotNull() {
        NewCottageDto cottageDto = new NewCottageDto();
        Tag tag = new Tag();
        tag.setAirCondition(true);
        cottageDto.setTags(tag);
        cottageService.addNewCottageForOwner(cottageDto);

        verify(tagRepository, times(1)).save(any());

    }

    @Test
    void createNewCottageShouldNotSaveTagIfItsNull() {
        NewCottageDto cottageDto = new NewCottageDto();
        cottageService.addNewCottageForOwner(cottageDto);

        verify(tagRepository, never()).save(any());
    }


}
