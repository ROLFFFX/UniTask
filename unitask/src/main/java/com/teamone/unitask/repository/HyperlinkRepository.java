package com.teamone.unitask.repository;

import com.teamone.unitask.model.Hyperlink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HyperlinkRepository extends JpaRepository<Hyperlink, Long> {
}
