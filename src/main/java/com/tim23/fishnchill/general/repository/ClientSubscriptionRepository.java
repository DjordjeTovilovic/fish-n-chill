package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.ClientSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ClientSubscriptionRepository extends JpaRepository<ClientSubscription, Long> {
    @Transactional
    @Modifying
    @Query(value = "insert into client_subscription (client_id,entity_id,type) VALUES (:clientId,:entityId,:type)", nativeQuery = true)
    void subscribe(@Param("clientId") Long clientId, @Param("entityId") Long entityId, @Param("type") String type);
    ClientSubscription findClientSubscriptionByClientIdAndEntityId(Long clientId, Long entityId);
    boolean existsByClientIdAndEntityId(Long clientId, Long entityId);
    @Transactional
    void deleteByClientIdAndEntityId(Long clientId, Long entityId);

    List<ClientSubscription> findAllByEntityId(Long entityId);
    List<ClientSubscription> findAllByClientId(Long clientId);
}
