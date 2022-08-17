package com.tim23.fishnchill.adventure.repository;

import com.tim23.fishnchill.adventure.model.Adventure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
    List<Adventure> findByNameContainingIgnoreCase(String name);

    List<Adventure> findByDescriptionContainingIgnoreCase(String description);

    List<Adventure> findByAddressContainingIgnoreCase(String address);

    List<Adventure> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String address, String description);

}
