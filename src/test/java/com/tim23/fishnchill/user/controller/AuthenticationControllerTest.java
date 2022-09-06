package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.constants.UserConstants;
import com.tim23.fishnchill.user.dto.LoginDto;
import com.tim23.fishnchill.user.dto.RegistrationDto;
import com.tim23.fishnchill.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static com.tim23.fishnchill.constants.UserConstants.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthenticationControllerTest {

    private static final String URL_PREFIX = "/auth/";

    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype());

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testLoginUser() throws Exception {
        LoginDto loginDto = new LoginDto(DB_USERNAME, DB_PASSWORD);
        String json = TestUtil.json(loginDto);
        this.mockMvc.perform(post(URL_PREFIX+"login").contentType(contentType).content(json)).andExpect(status().isOk());
    }


    @Test
    public void testSignup() throws Exception {
        RegistrationDto registrationDto = new RegistrationDto(NEW_USERNAME, NEW_PASSWORD, NEW_EMAIL, "ROLE_CLIENT", null, null ,null, null, null, null);
        String json = TestUtil.json(registrationDto);
        this.mockMvc.perform(post(URL_PREFIX+"signup").contentType(contentType).content(json)).andExpect(status().isCreated());
    }
}