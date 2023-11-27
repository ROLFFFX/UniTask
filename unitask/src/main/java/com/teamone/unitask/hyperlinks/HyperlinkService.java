package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.exception.ResourceNotFoundException;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * The Service class for the Hyperlink Page;
 */
@Service
public class HyperlinkService {

    @Autowired
    HyperlinkRepository hyperlinkRepository;

    @Autowired
    ProjectRepository projectRepository;


    /*
     * take a Hyperlink object and the project title as input, store the new Hyperlink Object into the database;
     * if the project title is invalid, return null;
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

    /*
     * take the project title as input; return a list of Hyperlink object that has the given project as the foreign key
     * for the projectId field; return null if the project title is invalid;
     */
    public List<Hyperlink> getHyperlinksByProjectTitle(String projectTitle) {

        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        List<Hyperlink> requestListHyperlinks = hyperlinkRepository.getHyperlinksByProjectId(curProject);

        return requestListHyperlinks;
    }

    /*
     * take the project title as input
     */
    public Hyperlink editHyperlinkByHyperlinkId(Long hyperlinkId, Hyperlink newHyperlink) {

        // get hyperlink and modify its fields
        Hyperlink curHyperlink = hyperlinkRepository.findById(hyperlinkId).
                orElseThrow(() -> new ResourceNotFoundException("Hyperlink not found with id: " + hyperlinkId));

        curHyperlink.setTitle(newHyperlink.getTitle());
        curHyperlink.setUrl(newHyperlink.getUrl());

        hyperlinkRepository.save(curHyperlink);

        return curHyperlink;
    }

    public Hyperlink deleteHyperlinkByHyperlinkId(Long hyperlinkId) {

        Hyperlink hyperlinkToDelete = hyperlinkRepository.findById(hyperlinkId).
                orElseThrow(() -> new ResourceNotFoundException("Hyperlink not found with id: " + hyperlinkId));

        hyperlinkRepository.deleteById(hyperlinkToDelete.getHyperlinkId());

        return hyperlinkToDelete;
    }
}
