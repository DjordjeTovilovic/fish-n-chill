package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
