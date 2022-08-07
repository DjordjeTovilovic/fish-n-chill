package com.tim23.fishnchill.reservation.repository;

import com.tim23.fishnchill.reservation.model.CottageReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CottageReservationRepository extends JpaRepository<CottageReservation, Long> {
    List<CottageReservation> findAllByClientIdAndReservationEndIsBefore(Long id, LocalDateTime date);
    List<CottageReservation> findAllByClientIdAndReservationEndIsAfter(Long id, LocalDateTime date);
    List<CottageReservation> findAllByCottageId(Long id);
}
