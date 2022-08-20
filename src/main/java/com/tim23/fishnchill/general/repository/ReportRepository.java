package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.jaas.JaasPasswordCallbackHandler;

public interface ReportRepository extends JpaRepository<Report,Long> {
}
