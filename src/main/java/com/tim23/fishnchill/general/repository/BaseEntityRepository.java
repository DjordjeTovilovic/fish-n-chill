package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BaseEntityRepository extends JpaRepository<BaseEntity, Long> {
    BaseEntity findBaseEntityById(Long id);
}
