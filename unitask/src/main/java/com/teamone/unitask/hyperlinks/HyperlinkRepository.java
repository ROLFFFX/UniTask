package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.hyperlinks.Hyperlink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HyperlinkRepository extends JpaRepository<Hyperlink, Long> {
}
