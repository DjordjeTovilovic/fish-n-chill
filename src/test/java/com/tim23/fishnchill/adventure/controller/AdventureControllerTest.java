package com.tim23.fishnchill.adventure.controller;

import com.tim23.fishnchill.adventure.dto.NewAdventureDto;
import com.tim23.fishnchill.constants.AdventureConstants;
import com.tim23.fishnchill.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static com.tim23.fishnchill.constants.AdventureConstants.*;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdventureControllerTest {
    private static final String URL_PREFIX = "/api/adventures/";

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
    public void testGetAllAdventures() throws Exception {
        mockMvc.perform(get(URL_PREFIX)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType)).andExpect(jsonPath("$", hasSize(DB_COUNT)))
                .andExpect(jsonPath("$.[*].id").value(hasItem(AdventureConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }


    @Test
    public void testGetAdventure() throws Exception {
        mockMvc.perform(get(URL_PREFIX + AdventureConstants.DB_ID)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id").value(AdventureConstants.DB_ID.intValue()))
                .andExpect(jsonPath("$.name").value(DB_NAME))
                .andExpect(jsonPath("$.address").value(DB_ADDRESS))
                .andExpect(jsonPath("$.description").value(DB_DESCRIPTION));
    }


    @Test
    @Transactional
    @Rollback(true)
    public void testSaveAdventure() throws Exception {
        NewAdventureDto adventure = new NewAdventureDto();
        adventure.setName(NEW_NAME);
        adventure.setAddress(NEW_ADDRESS);
        adventure.setDescription(NEW_DESCRIPTION);
        adventure.setOwnerId(DB_OWNER_ID);

        String json = TestUtil.json(adventure);
        this.mockMvc.perform(post(URL_PREFIX).contentType(contentType).content(json)).andExpect(status().isCreated());
    }
}