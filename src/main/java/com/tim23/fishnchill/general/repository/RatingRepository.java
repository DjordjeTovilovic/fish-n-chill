package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByClientId (Long clientId);
    boolean existsByClientIdAndEntityId (Long clientId, Long entityId);

    @Transactional
    @Modifying
    @Query("update Rating r set r.rating = :rating where r.client.id = :clientId and r.entity.id= :entityId")
    void updateRateEntity(@Param("rating") Float rating, @Param("clientId") Long clientId, @Param("entityId") Long entityId);

    @Transactional
    @Modifying
    @Query(value = "insert into Rating (rating,client_id,entity_id) VALUES (:rating,:clientId,:entityId)", nativeQuery = true)
    void rateEntity(@Param("rating") Float rating, @Param("clientId") Long clientId, @Param("entityId") Long entityId);
}
