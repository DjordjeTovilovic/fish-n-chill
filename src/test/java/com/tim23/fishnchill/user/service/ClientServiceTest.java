package com.tim23.fishnchill.user.service;

import com.tim23.fishnchill.user.repository.ClientRepository;
import com.tim23.fishnchill.user.repository.UserResponseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ClientServiceTest {

    @Mock
    private ClientRepository clientRepository;

    private ClientService underTest;

    private ModelMapper modelMapper;
    private PasswordEncoder passwordEncoder;
    private AuthorityService authService;
    private UserResponseRepository userResponseRepository;

    @BeforeEach
    void setUp() {
        underTest = new ClientService(modelMapper, clientRepository, passwordEncoder, authService, userResponseRepository);
    }

    @Test
    void resetPenalties() {
        //when
        underTest.resetPenalties();
        //then
        verify(clientRepository).resetPenalties();
    }


}