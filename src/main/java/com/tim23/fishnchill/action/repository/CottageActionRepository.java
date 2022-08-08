package com.tim23.fishnchill.action.repository;

import com.tim23.fishnchill.action.model.CottageAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CottageActionRepository extends JpaRepository<CottageAction, Long> {
    @Query("Select a from CottageAction a where a.actionEnd >= CURRENT_DATE")
    List<CottageAction> findAllActiveActions();

}
