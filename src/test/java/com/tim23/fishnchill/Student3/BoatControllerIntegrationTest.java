package com.tim23.fishnchill.Student3;


import com.tim23.fishnchill.boat.dto.NewBoatDto;
import com.tim23.fishnchill.constants.BoatConstants;
import com.tim23.fishnchill.constants.CottageConstants;
import com.tim23.fishnchill.cottage.dto.CottageDto;
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
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDateTime;

import static com.tim23.fishnchill.constants.BoatConstants.*;



import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BoatControllerIntegrationTest {

    private static final String URL_PREFIX = "/api/boats/";

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
    public void testGetAllBoats() throws Exception {
        mockMvc.perform(get(URL_PREFIX)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType)).andExpect(jsonPath("$", hasSize(DB_COUNT)))
                .andExpect(jsonPath("$.[*].id").value(hasItem(BoatConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetBoat() throws Exception {
        mockMvc.perform(get(URL_PREFIX + BoatConstants.DB_ID)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.id").value(BoatConstants.DB_ID.intValue()))
                .andExpect(jsonPath("$.name").value(DB_NAME))
                .andExpect(jsonPath("$.address").value(DB_ADDRESS))
                .andExpect(jsonPath("$.description").value(DB_DESCRIPTION));
    }


    @Test
    @Transactional
    @Rollback(true)
    public void testDeleteBoat() throws Exception {
        this.mockMvc.perform(delete(URL_PREFIX + BoatConstants.DB_ID)).andExpect(status().isOk());
    }

    @Test
    public void testGetBoatByName() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "name/" + DB_NAME)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(BoatConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetBoatByAddress() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "address/" + DB_ADDRESS)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(BoatConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetBoatByPeriod() throws Exception {
        DatePeriodDto datePeriod = new DatePeriodDto();
        datePeriod.setStartDate(LocalDateTime.of(2022, 5, 22, 12, 30));
        datePeriod.setEndDate(LocalDateTime.of(2022, 8, 22, 12, 30));


        String json = TestUtil.json(datePeriod);
        this.mockMvc.perform(post(URL_PREFIX + "findByPeriod/").contentType(contentType).content(json)).andExpect(status().isOk());
    }

    @Test
    public void testGetBoatByDescription() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "description/" + DB_DESCRIPTION)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(BoatConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }

    @Test
    public void testGetboatsByAnything() throws Exception {
        mockMvc.perform(get(URL_PREFIX + "anything/" + DB_ADDRESS)).andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.[*].id").value(hasItem(BoatConstants.DB_ID.intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DB_NAME)))
                .andExpect(jsonPath("$.[*].address").value(hasItem(DB_ADDRESS)))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DB_DESCRIPTION)));
    }



}
