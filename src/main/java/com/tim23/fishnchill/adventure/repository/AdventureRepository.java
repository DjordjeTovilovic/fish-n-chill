package com.tim23.fishnchill.adventure.repository;

import com.tim23.fishnchill.adventure.model.Adventure;
import com.tim23.fishnchill.boat.model.Boat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface AdventureRepository extends JpaRepository<Adventure, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Adventure a WHERE a.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "0")})
    Adventure findByIdAndLock(Long id);

    List<Adventure> findByNameContainingIgnoreCase(String name);

    List<Adventure> findByDescriptionContainingIgnoreCase(String description);

    List<Adventure> findByAddressContainingIgnoreCase(String address);

    List<Adventure> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String address, String description);

}
