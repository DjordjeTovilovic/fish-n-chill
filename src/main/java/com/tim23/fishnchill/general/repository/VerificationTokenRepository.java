package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.VerificationToken;
import com.tim23.fishnchill.user.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);

    VerificationToken findByClient(Client client);
}
