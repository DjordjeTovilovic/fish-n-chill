package com.tim23.fishnchill.reservation.repository;

import com.tim23.fishnchill.reservation.model.BoatReservation;
import com.tim23.fishnchill.reservation.model.CottageReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BoatReservationRepository extends JpaRepository<BoatReservation, Long> {
    List<CottageReservation> findAllByClientIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

    List<CottageReservation> findAllByClientIdAndReservationEndIsAfterOrderByReservationStartAsc(Long id, LocalDateTime date);

    List<CottageReservation> findAllByEntityId(Long id);

    List<CottageReservation> findAllByEntityIdAndReservationStartBeforeAndReservationEndAfter(Long id, LocalDateTime date, LocalDateTime date2);

    List<CottageReservation> findAllByEntityIdAndReservationEndIsBeforeOrderByReservationStartDesc(Long id, LocalDateTime date);

}
