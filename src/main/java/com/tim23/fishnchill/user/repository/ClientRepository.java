package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.Client;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Transactional
    @Modifying
    @Query("update Client c set c.penaltyCount = 0 where c.penaltyCount>0")
    void resetPenalties();

}
