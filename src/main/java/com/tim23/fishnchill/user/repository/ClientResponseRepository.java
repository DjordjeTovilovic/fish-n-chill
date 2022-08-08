package com.tim23.fishnchill.user.repository;

import com.tim23.fishnchill.user.model.ClientResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientResponseRepository extends JpaRepository<ClientResponse,Long> {
    Boolean existsByClientId(Long clientId);
}
