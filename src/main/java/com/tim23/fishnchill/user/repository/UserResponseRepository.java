package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.user.model.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.LockModeType;
import javax.persistence.QueryHint;

public interface UserResponseRepository extends JpaRepository<UserResponse, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM UserResponse c WHERE c.id = :id")
    @QueryHints({@QueryHint(name = "javax.persistence.lock.timeout", value = "0")})
    UserResponse findByIdAndLock(Long id);

    boolean existsByUserIdAndResponseType(Long clientId, UserResponseType userResponseType);

    boolean existsByReservationIdAndResponseType(Long reservationId, UserResponseType userResponseType);



}
