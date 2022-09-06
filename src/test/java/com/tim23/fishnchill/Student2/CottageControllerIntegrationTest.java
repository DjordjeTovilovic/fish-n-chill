package com.tim23.fishnchill.Student2;


import static com.tim23.fishnchill.constants.CottageConstants.*;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.time.LocalDateTime;

import com.tim23.fishnchill.constants.CottageConstants;
import com.tim23.fishnchill.cottage.dto.CottageDto;
import com.tim23.fishnchill.cottage.dto.NewCottageDto;
import com.tim23.fishnchill.cottage.model.Cottage;
import com.tim23.fishnchill.reservation.dto.DatePeriodDto;
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
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CottageControllerIntegrationTest {

    private static final String URL_PREFIX = "/api/cottages/";

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
    public void testGetAllCottages() throws Exception {
        mockMvc.perform(get(URL_PREFIX)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType)).andExpect(jsonPath("$", hasSize(DB_COUNT)))
                .andExpect(jsonPath("$.[*].id").value(hasItem(CottageConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }


    @Test
    public void testGetCottage() throws Exception {
        mockMvc.perform(get(URL_PREFIX + CottageConstants.DB_ID)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id").value(CottageConstants.DB_ID.intValue()))
                .andExpect(jsonPath("$.name").value(DB_NAME))
                .andExpect(jsonPath("$.address").value(DB_ADDRESS))
                .andExpect(jsonPath("$.description").value(DB_DESCRIPTION));
    }


    @Test
    @Transactional
    @Rollback(true)
    public void testSaveCottage() throws Exception {
        NewCottageDto cottage = new NewCottageDto();
        cottage.setName(NEW_NAME);
        cottage.setAddress(NEW_ADDRESS);
        cottage.setDescription(NEW_DESCRIPTION);
        cottage.setOwnerId(DB_OWNER_ID);

        String json = TestUtil.json(cottage);
        this.mockMvc.perform(post(URL_PREFIX).contentType(contentType).content(json)).andExpect(status().isCreated());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void testUpdateCottage() throws Exception {
        CottageDto cottage = new CottageDto();
        cottage.setId(CottageConstants.DB_ID);
        cottage.setName(NEW_NAME);
        cottage.setAddress(NEW_ADDRESS);
        cottage.setDescription(NEW_DESCRIPTION);

        String json = TestUtil.json(cottage);
        this.mockMvc.perform(put(URL_PREFIX + CottageConstants.DB_ID).contentType(contentType).content(json)).andExpect(status().isOk());
    }

    @Test
    @Transactional
    @Rollback(true)
    public void testDeleteCottage() throws Exception {
        this.mockMvc.perform(delete(URL_PREFIX + CottageConstants.DB_ID)).andExpect(status().isOk());
    }

    @Test
    public void testGetCottageByName() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "name/" + DB_NAME)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(CottageConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetCottageByAddress() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "address/" + DB_ADDRESS)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(CottageConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetCottageByDescription() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "description/" + DB_DESCRIPTION)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(CottageConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetCottageByPeriod() throws Exception {
        DatePeriodDto datePeriod = new DatePeriodDto();
        datePeriod.setStartDate(LocalDateTime.of(2022, 5, 22, 12, 30));
        datePeriod.setEndDate(LocalDateTime.of(2022, 8, 22, 12, 30));


        String json = TestUtil.json(datePeriod);
        this.mockMvc.perform(post(URL_PREFIX + "findByPeriod/").contentType(contentType).content(json)).andExpect(status().isOk());
    }

    @Test
    public void testGetCottageByAnything() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "anything/" + DB_ADDRESS)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(CottageConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

}
