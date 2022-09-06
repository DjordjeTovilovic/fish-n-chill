package com.tim23.fishnchill.general.controller;

import com.tim23.fishnchill.general.dto.ClientSubscriptionDto;
import com.tim23.fishnchill.general.dto.NewClientSubscriptionDto;
import com.tim23.fishnchill.general.model.enums.EntityType;
import com.tim23.fishnchill.general.service.ClientSubscriptionService;
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

import static com.tim23.fishnchill.constants.SubsConstants.*;
import static com.tim23.fishnchill.constants.UserConstants.*;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ClientSubscriptionControllerTest {
    private static final String URL_PREFIX = "/api/subscriptions/";

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
    public void testFindAllByClientId() throws Exception{
        mockMvc.perform(get(URL_PREFIX + "/" + DB_CLIENT_ID))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testExists() throws Exception{
        NewClientSubscriptionDto newClientSubscriptionDto = new NewClientSubscriptionDto(NEW_CLIENT_ID, NEW_ENTITY_ID, EntityType.COTTAGE);
        String json = TestUtil.json(newClientSubscriptionDto);
        this.mockMvc.perform(post(URL_PREFIX+"exists").contentType(contentType).content(json))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(content().string("false"));
    }

    @Test
    public void testSubscribe() throws Exception{
        NewClientSubscriptionDto newClientSubscriptionDto = new NewClientSubscriptionDto(NEW_CLIENT_ID, NEW_ENTITY_ID, EntityType.COTTAGE);
        String json = TestUtil.json(newClientSubscriptionDto);
        this.mockMvc.perform(post(URL_PREFIX+"subscribe").contentType(contentType).content(json))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType));
    }

    @Test
    public void testUnsubscribe() throws Exception{
        NewClientSubscriptionDto newClientSubscriptionDto = new NewClientSubscriptionDto(NEW_CLIENT_ID, NEW_ENTITY_ID, EntityType.COTTAGE);
        String json = TestUtil.json(newClientSubscriptionDto);
        this.mockMvc.perform(delete(URL_PREFIX+"unsubscribe?clientId=" + NEW_CLIENT_ID + "&entityId=" + NEW_ENTITY_ID).contentType(contentType).content(json))
                .andExpect(status().isOk());
    }
}