package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.general.model.enums.UserResponseType;
import com.tim23.fishnchill.user.model.UserResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserResponseRepository extends JpaRepository<UserResponse,Long> {
    Boolean existsByUserIdAndResponseType(Long clientId, UserResponseType userResponseType);
}
