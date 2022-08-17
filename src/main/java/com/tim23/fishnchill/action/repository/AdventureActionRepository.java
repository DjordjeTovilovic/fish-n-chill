package com.tim23.fishnchill.action.repository;

import com.tim23.fishnchill.action.model.AdventureAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdventureActionRepository extends JpaRepository<AdventureAction, Long> {
    @Query("Select a from AdventureAction a where a.actionEnd >= CURRENT_DATE order by a.actionEnd asc")
    List<AdventureAction> findAllActiveActions();

    boolean existsBy();
}
