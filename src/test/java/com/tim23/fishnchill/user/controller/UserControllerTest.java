package com.tim23.fishnchill.user.controller;

import com.tim23.fishnchill.constants.UserConstants;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    private static final String URL_PREFIX = "/api/users/";

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
    public void testGetUserById() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "profile/" + DB_ID)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id").value(UserConstants.DB_ID.intValue()))
                .andExpect(jsonPath("$.username").value(DB_USERNAME))
                .andExpect(jsonPath("$.address").value(DB_ADDRESS))
                .andExpect(jsonPath("$.firstName").value(DB_FIRSTNAME));
    }


    @Test
    public void testGetMe() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "whoami"))
                .andExpect(content().contentType(contentType))
                .andExpect(status().isInternalServerError());
    }
}