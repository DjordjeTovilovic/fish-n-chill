package com.tim23.fishnchill.reservation.repository;

import com.tim23.fishnchill.reservation.model.BoatReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BoatReservationRepository extends JpaRepository<BoatReservation, Long> {
    List<BoatReservation> findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

    List<BoatReservation> findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(Long id, LocalDateTime date);

    List<BoatReservation> findAllByEntityId(Long id);

    List<BoatReservation> findAllByEntityIdAndReservationStartBeforeAndReservationEndAfter(Long id, LocalDateTime date, LocalDateTime date2);

    List<BoatReservation> findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

}
