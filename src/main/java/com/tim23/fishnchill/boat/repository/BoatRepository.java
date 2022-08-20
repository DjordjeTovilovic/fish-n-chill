package com.tim23.fishnchill.boat.repository;

import com.tim23.fishnchill.boat.model.Boat;
import com.tim23.fishnchill.cottage.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface BoatRepository extends JpaRepository<Boat, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Boat b WHERE b.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "0")})
    Boat findByIdAndLock(Long id);

    List<Boat> findByNameContainingIgnoreCase(String name);

    List<Boat> findByDescriptionContainingIgnoreCase(String description);

    List<Boat> findByAddressContainingIgnoreCase(String Address);

    List<Boat> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String address, String description);

}
