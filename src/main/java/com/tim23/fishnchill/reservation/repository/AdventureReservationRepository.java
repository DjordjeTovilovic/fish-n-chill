package com.tim23.fishnchill.reservation.repository;

import com.tim23.fishnchill.reservation.model.AdventureReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface AdventureReservationRepository extends JpaRepository<AdventureReservation, Long> {
    List<AdventureReservation> findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

    List<AdventureReservation> findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(Long id, LocalDateTime date);

    List<AdventureReservation> findAllByEntityId(Long id);

    List<AdventureReservation> findAllByEntityIdAndReservationStartBeforeAndReservationEndAfter(Long id, LocalDateTime date, LocalDateTime date2);

    List<AdventureReservation> findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

}
