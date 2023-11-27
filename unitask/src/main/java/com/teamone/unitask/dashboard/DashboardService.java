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


/**
 * The Service class for the Dashboard page;
 */
@Service
public class DashboardService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    TaskRepository taskRepository;


    /*
     * helper function for the "getTaskDistributionByProjectTitle" function in the controller layer;
     */
    public HashMap<String, Integer> getTaskDistributionByProjectTitle(String projectTitle) {

        // if no project existed with the given project title, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // get the project by projectTitle;
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // calculate task points completed by each member by iterating through all task a user have in a project,
        // and get the sum of the task points of tasks that have been marked as done;
        HashMap<String, Integer> taskDistribution = new HashMap<>();

        List<User> allUsersInProject = userRepository.findUserByProjects(curProject);
        for (User thisUser: allUsersInProject) {

            List<Task> allTaskUserHasInCurProject =
                    taskRepository.findTasksByTaskMemberAssignedAndProjectBelonged(thisUser, curProject);

            Integer completedTaskPointsCount = 0;
            for (Task userTask: allTaskUserHasInCurProject) {

                //subtasks does not have task point field, so skip when iterating;
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

        // return the HashMap;
        return taskDistribution;
    }

    /*
     * helper function for the "getCurProjectTeamProgress" function in the controller layer;
     */
    public HashMap<String, Integer> getTeamProgressByProjectTitle(String projectTitle) {

        // if no project existed with the given project title, return null;
        if (!projectRepository.existsByProjectTitle(projectTitle)) {
            return null;
        }

        // get the project by projectTitle;
        Project curProject = projectRepository.findByProjectTitle(projectTitle);

        // calculate total task points of each status by iterating through all tasks in the given project,
        // and update for based on the tasks' status;
        HashMap<String, Integer> taskStatusDistribution = new HashMap<>();
        taskStatusDistribution.put("Not Started", 0);
        taskStatusDistribution.put("To Do", 0);
        taskStatusDistribution.put("Doing", 0);
        taskStatusDistribution.put("Done", 0);

        List<Task> allTaskOfCurProject = taskRepository.findByProjectBelonged(curProject);
        for (Task thisTask: allTaskOfCurProject) {

            //subtasks does not have task point field, so skip when iterating;
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

        // return the HashMap;
        return taskStatusDistribution;
    }


}
