package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.AdventureOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdventureOwnerRepository extends JpaRepository<AdventureOwner, Long> {
    public List<AdventureOwner> findAllByEnabledTrue();

}
