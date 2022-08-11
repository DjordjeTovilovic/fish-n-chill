package com.tim23.fishnchill.general.repository;

import com.tim23.fishnchill.general.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag,Long> {
}
