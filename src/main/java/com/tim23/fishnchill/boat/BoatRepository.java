package com.tim23.fishnchill.boat;

import com.tim23.fishnchill.boat.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoatRepository extends JpaRepository<Boat, Long> {
    List<Boat> findByNameContainingIgnoreCase(String name);

    List<Boat> findByDescriptionContainingIgnoreCase(String description);

    List<Boat> findByAddressContainingIgnoreCase(String Address);

    List<Boat> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String address, String description);

}
