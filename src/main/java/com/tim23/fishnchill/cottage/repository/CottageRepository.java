package com.tim23.fishnchill.cottage.repository;

import com.tim23.fishnchill.cottage.model.Cottage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;
import java.util.List;

public interface CottageRepository extends JpaRepository<Cottage, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM Cottage c WHERE c.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "0")})
    Cottage findByIdAndLock(Long id);

    List<Cottage> findByNameContainingIgnoreCase(String name);

    List<Cottage> findByDescriptionContainingIgnoreCase(String description);

    List<Cottage> findByAddressContainingIgnoreCase(String address);

    List<Cottage> findByNameContainingIgnoreCaseOrAddressContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String address, String description);
}
