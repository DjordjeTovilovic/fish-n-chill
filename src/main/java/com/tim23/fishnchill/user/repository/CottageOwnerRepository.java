package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.CottageOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CottageOwnerRepository extends JpaRepository<CottageOwner, Long> {
    public List<CottageOwner> findAllByEnabledTrue();
}
