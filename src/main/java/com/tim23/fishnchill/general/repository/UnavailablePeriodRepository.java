package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.UnavailablePeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnavailablePeriodRepository extends JpaRepository<UnavailablePeriod, Long> {
    List<UnavailablePeriod> findAllByEntityId(Long id);

}
