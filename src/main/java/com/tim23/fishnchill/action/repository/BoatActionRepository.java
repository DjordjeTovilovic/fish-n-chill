package com.tim23.fishnchill.action.repository;

import com.tim23.fishnchill.action.model.BoatAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoatActionRepository extends JpaRepository<BoatAction, Long> {
    @Query("Select a from BoatAction a where a.actionEnd >= CURRENT_DATE order by a.actionEnd asc")
    List<BoatAction> findAllActiveActions();

    boolean existsBy();
}
