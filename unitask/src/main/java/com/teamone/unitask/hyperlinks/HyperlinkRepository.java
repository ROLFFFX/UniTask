package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.hyperlinks.Hyperlink;
import com.teamone.unitask.projects.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Repository interface for Hyperlink entities.
 */
@Repository
public interface HyperlinkRepository extends JpaRepository<Hyperlink, Long> {

    /**
     * Find hyperlinks by associated project.
     *
     * @param project The project associated with the hyperlinks.
     * @return List of hyperlinks associated with the given project.
     */
    List<Hyperlink> findHyperlinksByProjectId(Project project);

    /**
     * Check if a hyperlink with the given hyperlinkId exists.
     *
     * @param hyperlinkId The id of the hyperlink to check.
     * @return True if the hyperlink exists, false otherwise.
     */
    Boolean existsByHyperlinkId(Long hyperlinkId);

    /**
     * Get a hyperlink by its hyperlinkId.
     *
     * @param hyperlinkId The id of the hyperlink to retrieve.
     * @return The Hyperlink object associated with the given hyperlinkId.
     */
    Hyperlink getHyperlinkByHyperlinkId(Long hyperlinkId);

    /**
     * Get all hyperlinks associated with a specific project.
     *
     * @param projectId The id of the project to retrieve hyperlinks for.
     * @return List of hyperlinks associated with the given project.
     */
    List<Hyperlink> getHyperlinksByProjectId(Project projectId);
}
