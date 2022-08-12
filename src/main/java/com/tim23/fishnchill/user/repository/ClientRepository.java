package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.Client;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Transactional
    @Modifying
    @Query("update Client c set c.penaltyCount = 0 where c.penaltyCount>0")
    void resetPenalties();

}
