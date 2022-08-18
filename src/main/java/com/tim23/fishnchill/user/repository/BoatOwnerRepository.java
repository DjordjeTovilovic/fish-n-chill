package com.tim23.fishnchill.user.repository;


import com.tim23.fishnchill.user.model.BoatOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoatOwnerRepository extends JpaRepository<BoatOwner, Long> {
    public List<BoatOwner> findAllByEnabledTrue();
}
