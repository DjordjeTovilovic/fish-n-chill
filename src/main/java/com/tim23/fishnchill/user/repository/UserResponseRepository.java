package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.user.model.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserResponseRepository extends JpaRepository<UserResponse,Long> {
    boolean existsByUserIdAndResponseType(Long clientId, UserResponseType userResponseType);
    boolean existsByReservationIdAndResponseType(Long reservationId, UserResponseType userResponseType);
}
