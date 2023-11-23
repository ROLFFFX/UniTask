package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.hyperlinks.Hyperlink;
import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HyperlinkRepository extends JpaRepository<Hyperlink, Long> {

    List<Hyperlink> findHyperlinksByProjectId(Project project);

    Boolean existsByHyperlinkId(Long hyperlinkId);

    Hyperlink getHyperlinkByHyperlinkId(Long hyperlinkId);

    List<Hyperlink> getHyperlinksByProjectId(Project projectId);
}
