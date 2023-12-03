package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Service class for the Hyperlink Page.
 */
@Service
public class HyperlinkService {

    @Autowired
    HyperlinkRepository hyperlinkRepository;

    @Autowired
    ProjectRepository projectRepository;


    /**
     * Takes a Hyperlink object and the project title as input, stores the new Hyperlink Object into the database.
     * If the project title is invalid, returns null.
     *
     * @param requestHyperlink The Hyperlink object to be created.
     * @param projectTitle     The title of the project to associate the Hyperlink with.
     * @return The created Hyperlink object if successful, otherwise null.
     */
    public Hyperlink createHyperlink(Hyperlink requestHyperlink, String projectTitle) {

        // if given project does not exist, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // else, set projectId (type: project) in the requestHyperlink, then return;
        Project projectBelonged = projectRepository.findByProjectTitle(projectTitle);
        requestHyperlink.setProjectId(projectBelonged);
        hyperlinkRepository.save(requestHyperlink);

        // return;
        return requestHyperlink;
    }

    /**
     * Takes the project title as input and returns a list of Hyperlink objects that have the given project as the
     * foreign key for the projectId field. Returns null if the project title is invalid.
     *
     * @param projectTitle The title of the project to retrieve Hyperlinks for.
     * @return List of Hyperlinks associated with the given project, or null if the project title is invalid.
     */
    public List<Hyperlink> getHyperlinksByProjectTitle(String projectTitle) {

        // if given project does not exist, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // else, get the project object from database, and get all hyperlink objects in the project;
        Project curProject = projectRepository.findByProjectTitle(projectTitle);
        List<Hyperlink> requestListHyperlinks = hyperlinkRepository.getHyperlinksByProjectId(curProject);

        // return the List of Hyperlinks
        return requestListHyperlinks;
    }

    /**
     * Takes the hyperlinkId and a new hyperlink object as input.
     * Modifies the existing hyperlink in the database. If successfully modified, return the modified hyperlink object.
     * Otherwise, throw the ResourceNotFoundException.
     *
     * @param hyperlinkId The id of the hyperlink to be updated.
     * @param newHyperlink The new Hyperlink object with updated values.
     * @return The updated Hyperlink object.
     * @throws ResourceNotFoundException If the Hyperlink with the given id is not found.
     */
    public Hyperlink editHyperlinkByHyperlinkId(Long hyperlinkId, Hyperlink newHyperlink) {

        // get hyperlink and modify its fields
        Hyperlink curHyperlink = hyperlinkRepository.findById(hyperlinkId).
                orElseThrow(() -> new ResourceNotFoundException("Hyperlink not found with id: " + hyperlinkId));

        // replace the field values with the new values and save the updated object;
        curHyperlink.setTitle(newHyperlink.getTitle());
        curHyperlink.setUrl(newHyperlink.getUrl());
        hyperlinkRepository.save(curHyperlink);

        // return the updated hyperlink object;
        return curHyperlink;
    }

    /**
     * Deletes a Hyperlink by its hyperlinkId.
     *
     * @param hyperlinkId The id of the hyperlink to be deleted.
     * @return The deleted Hyperlink object.
     * @throws ResourceNotFoundException If the Hyperlink with the given id is not found.
     */
    public Hyperlink deleteHyperlinkByHyperlinkId(Long hyperlinkId) {

        // get the Hyperlink object by id from the database, throw the ResourceNotFoundException if the object
        // is not found;
        Hyperlink hyperlinkToDelete = hyperlinkRepository.findById(hyperlinkId).
                orElseThrow(() -> new ResourceNotFoundException("Hyperlink not found with id: " + hyperlinkId));

        // delete the object;
        hyperlinkRepository.deleteById(hyperlinkToDelete.getHyperlinkId());

        // return the deleted object;
        return hyperlinkToDelete;
    }
}
