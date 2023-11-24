package com.teamone.unitask.dashboard;

import com.teamone.unitask.onboard.usermodels.User;
import com.teamone.unitask.onboard.userrepos.UserRepository;
import com.teamone.unitask.projects.Project;
import com.teamone.unitask.projects.ProjectRepository;
import com.teamone.unitask.tasks.Task;
import com.teamone.unitask.tasks.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TaskRepository taskRepository;


    public HashMap<String, Integer> getTaskDistributionByProjectTitle(String projectTitle) {

        // if no project existed with the given project title, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // get the project by projectTitle;
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // calculate task points completed by each member;
        HashMap<String, Integer> taskDistribution = new HashMap<>();

        List<User> allUsersInProject = userRepository.findUserByProjects(curProject);
        for (User thisUser: allUsersInProject) {

            List<Task> allTaskUserHasInCurProject =
                    taskRepository.findTasksByTaskMemberAssignedAndProjectBelonged(thisUser, curProject);

            Integer completedTaskPointsCount = 0;
            for (Task userTask: allTaskUserHasInCurProject) {

                if (userTask.getParentTaskId() != null) {
                    continue;
                }

                if (userTask.getStatus().equals("Done")) {
                    completedTaskPointsCount += userTask.getTaskPoints();
                }
            }

            String thisUserUsername = thisUser.getUsername();
            taskDistribution.put(thisUserUsername, completedTaskPointsCount);
        }

        return taskDistribution;
    }

    public HashMap<String, Integer> getTeamProgressByProjectTitle(String projectTitle) {

        // if no project existed with the given project title, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // get the project by projectTitle;
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // calculate total task points of each status;
        HashMap<String, Integer> taskStatusDistribution = new HashMap<>();
        taskStatusDistribution.put("Not Started", 0);
        taskStatusDistribution.put("To Do", 0);
        taskStatusDistribution.put("Doing", 0);
        taskStatusDistribution.put("Done", 0);

        List<Task> allTaskOfCurProject = taskRepository.findByProjectBelonged(curProject);
        for (Task thisTask: allTaskOfCurProject) {

            if (thisTask.getParentTaskId() != null) {
                continue;
            }

            String thisStatus = thisTask.getStatus();
            if (!taskStatusDistribution.containsKey(thisStatus)) {
                return null;
            } else {
                Integer newStatusTotal = taskStatusDistribution.get(thisStatus) + thisTask.getTaskPoints();
                taskStatusDistribution.replace(thisStatus, newStatusTotal);
            }
        }

        return taskStatusDistribution;
    }


}
