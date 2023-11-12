package com.teamone.unitask.hyperlinks;

import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HyperlinkService {

    @Autowired
    HyperlinkRepository hyperlinkRepository;

    @Autowired
    ProjectRepository projectRepository;

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

    public List<Hyperlink> getAllHyperlinkByProjectTitle(String projectTitle) {

        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        return hyperlinkRepository.findHyperlinksByProjectId(curProject);
    }

//    public Hyperlink editHyperlinkByHyperlinkId(Long hyperlinkId) {
//
//        // check if hyperlink existed;
//        if (!hyperlinkRepository.existsByHyperlinkId(hyperlinkId)) {
//            return null;
//        }
//
//        // get hyperlink and modify its fields
//        Hyperlink curHyperlink = hyperlinkRepository.getHyperlinkByHyperlinkId(hyperlinkId);
//
//
//    }

//    public Hyperlink deleteHyperlinkByHyperlinkId(Long hyperlinkId) {
//
//    }
}
