package com.tim23.fishnchill.user.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tim23.fishnchill.user.dto.LoginDto;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("test")
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SignupAndLoginIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    void shouldThrowBadRequestWhenRegisteringNewUserWithNoUsernameOrPassword() throws Exception {
        RegistrationDto registrationDto = new RegistrationDto();
        registrationDto.setUsername("OnlyUsernameSent");
        String registrationDtoJson = objectMapper.writeValueAsString(registrationDto);

        mockMvc.perform(post("/auth/signup")
                        .contentType("application/json")
                        .content(registrationDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(2)
    void shouldRegisterNewUser() throws Exception {
        RegistrationDto registrationDto = new RegistrationDto();
        registrationDto.setUsername("TestUsername");
        registrationDto.setPassword("TestPassword");
        String registrationDtoJson = objectMapper.writeValueAsString(registrationDto);

        mockMvc.perform(post("/auth/signup")
                        .contentType("application/json")
                        .content(registrationDtoJson))
                .andExpect(status().isCreated());
    }

    @Test
    @Order(3)
    void shouldThrowBadRequestWhenLoginWithNullFields() throws Exception {
        LoginDto loginDto = new LoginDto();
        loginDto.setUsername("OnlyUsernameSent");
        String loginDtoJson = objectMapper.writeValueAsString(loginDto);

        mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content(loginDtoJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(4)
    void shouldThrowBadCredentialsWhenInvalidUsernameAndPasswordCombination() throws Exception {
        LoginDto loginDto = new LoginDto("TestUsername", "BadPassword");
        String loginDtoJson = objectMapper.writeValueAsString(loginDto);

        mockMvc.perform(post("/auth/login")
                        .contentType("application/json")
                        .content(loginDtoJson))
                .andExpect(status().is(401)).andDo(print());
    }

    @Test
    @Order(5)
    void shouldLogin() throws Exception {
        LoginDto loginDto = new LoginDto("TestUsername", "TestPassword");
        String loginDtoJson = objectMapper.writeValueAsString(loginDto);
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginDtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists());
    }


    @Test
    @Order(6)
    @Disabled
    void shouldRefreshAuthenticationToken() {
    }
}