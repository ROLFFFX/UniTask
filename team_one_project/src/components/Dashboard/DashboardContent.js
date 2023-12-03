/**
 * @fileoverview This file includes the DashboardContent component, which defines the
 * entire content you will see in dashboard page. It performs multipurposely as an
 * intermediate stage. It controls to toggle of view between "Data Visual View" and
 * "Table Task View", and does some elementary data processing before it sends them
 * down to each individual components. It also fetches data from server and controls
 * the general layout of entire letf section of dashbaord page.
 */

import LinearProgress from "@mui/joy/LinearProgress";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import DataVisualization from "./DataVisualization";
import ProgressBar from "./ProgressBar";
import "./TaskList.css";
import TaskView from "./TaskView";
import { TeamProgress } from "./TeamProgress";

/**
 * DashboardContent - A functional component that renders the left side dashboard view of the dashboard.
 *
 * This component fetches and displays data regarding task distribution among team members,
 * overall progress of tasks, team member information, and all tasks in the current workspace.
 * It conditionally renders two different views based on the available data, which are table
 * task view and dashboard view
 *
 * State:
 * @state @type {boolean} backdropOpen - Controls the display of the loading backdrop.
 * @state @type {string} projectTitle - Title of the current project.
 * @state @type {Object} TaskDistributionData - Data about the task distribution among team members.
 * @state @type {Object} ProgressBarData - Data for rendering the progress bar.
 * @state @type {Array} formattedTeamMembers - List of team members in the workspace.
 * @state @type {Array} allTasks - List of all tasks in the project.
 * @state @type {string} toggleView - Toggles between different views of the dashboard.
 * @state @type {string} creationTime - Creation time of the workspace.
 *
 * Requests:
 * - fetchTaskDistributionAmongTeamMembers
 * - fetchProgressBarData
 * - fetchTeamMembers
 * - fetchAllTasks
 * - fetchWorkspaceCreationTime
 *
 * Helper Functions:
 * - reformatTaskDistribution - Formats task distribution data for visualization.
 * - handleToggleViewChange - Toggles between different task views.
 * - isEmptyList - Checks if an array is empty.
 *
 * useEffect:
 * - Fetches various data required for the dashboard on component mount.
 *
 * @returns {React.ReactElement} A React element representing the main dashboard content.
 */
export function DashboardContent() {
  /* Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [backdropOpen, setBackdropOpen] = React.useState(false); //loading page
  const projectTitle = auth.selectedWorkspace; // for current project title
  const [TaskDistributionData, setTaskDistributionData] = React.useState(); // Task distribution among groups
  const [ProgressBarData, setProgressBarData] = React.useState(); // Progress Bar: task done / undone
  const [formattedTeamMembers, setFormattedTeamMembers] = React.useState(); // team members
  const [allTasks, setAllTasks] = React.useState();
  const [toggleView, setToggleView] = React.useState("Data Visual View");
  const [creationTime, setCreationTime] = React.useState();
  const navigate = useNavigate();
  /* End of Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests Declarations-------------------------------------------------------------------------------------------------------------------- */
  // GET Method to retrieve task distribution among team members.
  // sample response.data:
  // {
  //   "User 1": number of TaskPoints done,
  //   "User 2": number of TaskPoints done,
  //   ...
  // }
  const fetchTaskDistributionAmongTeamMembers = async () => {
    setBackdropOpen(true); //display loading page

    const url = `${ENDPOINT_URL}dashboard/taskDistribution/${projectTitle}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      setTaskDistributionData(reformatTaskDistribution(response.data));
    } catch (error) {
      console.error("Error caught on fetching task distribution: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  //GET Method to retrieve Progress Bar information.
  // sample: response.data:
  // {
  //   "To Do": 0,
  //   "Done": 13,
  //   "Doing": 15,
  //   "Not Started": 2
  // }
  const fetchProgressBarData = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}dashboard/progressBar/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      setProgressBarData(response.data);
    } catch (error) {
      console.error("Error caught on fetching progress bar: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // GET Method for fetching Team Members in current workpsace
  // sample response.data: [userName, userName, userName]
  const fetchTeamMembers = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}projects/workspaceMembers/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      // Parse the response data and update the users teamstate: should only be a list of users
      const parsedTeamMembers = response.data.map((user) => user.username);
      setFormattedTeamMembers(parsedTeamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // GET Method to fetch all tasks
  const fetchAllTasks = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}tasks/getAllTask?projectTitle=${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      setAllTasks(response.data); //response.data contains raw data, list of lists.
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // GET Method for fetching Workspace Creation Time    //projects/creationTime/{projectTitle}
  const fetchWorkspaceCreationTime = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}projects/creationTime/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      setCreationTime(response.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setBackdropOpen(false);
    }
  };
  /* End of Requests Declarations-------------------------------------------------------------------------------------------------------------------- */
  function reformatTaskDistribution(unformattedData) {
    const reformattedData = [];
    for (const [x, y] of Object.entries(unformattedData)) {
      // Push a new object with the desired structure into the array
      reformattedData.push({ x, y });
    }
    return reformattedData;
  }
  /* Helper Functions Declarations-------------------------------------------------------------------------------------------------------------------- */
  const handleToggleViewChange = (newView) => {
    setToggleView(newView); // Assuming setToggleView is your state setter
  };

  // check if an object is an empty list
  function isEmptyList(obj) {
    return Array.isArray(obj) && obj.length === 0;
  }
  /* End of Helper Functions Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */
  React.useEffect(() => {
    fetchTaskDistributionAmongTeamMembers();
    fetchProgressBarData();
    fetchTeamMembers();
    fetchAllTasks();
    fetchWorkspaceCreationTime();
  }, []);

  /* End of useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */
  // Conditioanlly render page. If tasks is empty (according to server), indicate user to create first task.
  if (isEmptyList(allTasks)) {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="end"
              height="calc((100vh - 64px)/2)"
            >
              <Typography
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                }}
                marginBottom={3}
              >
                Dashboard is currently unavailable, please come back after you
                create your first task!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="start"
              height="calc((100vh - 64px)/2)"
              mt={4}
            >
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  navigate("/sprintboard");
                }}
              >
                Create My First Task
              </Button>
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  // Conditionally render page. If data is ready, render page.
  if (
    TaskDistributionData &&
    ProgressBarData &&
    formattedTeamMembers &&
    allTasks
  ) {
    return (
      <React.Fragment>
        {/* loading state */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {/* Box for entire page excluding nav bars on top and left */}
        <Box
          style={{
            height: "calc(100vh - 64px)", // overall height of entire Box on left. top nav bar is 64px
            overflowY: "hide",
            maxHeight: "calc(100vh - 64px)",
          }}
        >
          <Grid container>
            {/* Grid For Left Side Bar */}
            <Grid container item xs={8} style={{ position: "relative" }}>
              {/* Grid for task list */}
              <Grid
                item
                xs={12}
                height="calc(100vh - 64px)"
                maxHeight="calc(100vh - 64px)"
                overflow="hidden"
                className="custom-scrollbar"
              >
                {/* Conditionally renders two views according to toggleView state.  */}
                {toggleView === "Table Task View" ? (
                  <TaskView
                    taskData={allTasks}
                    formattedTeamMembers={formattedTeamMembers}
                    toggleView={toggleView}
                    onToggleViewChange={handleToggleViewChange}
                  />
                ) : (
                  <DataVisualization
                    taskData={allTasks}
                    formattedTeamMembers={formattedTeamMembers}
                    toggleView={toggleView}
                    onToggleViewChange={handleToggleViewChange}
                    workspaceCreationTime={creationTime}
                  />
                )}
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                style={{
                  position: "absolute",
                  right: 0,
                  top: "5%",
                  height: "90%",
                  zIndex: 1, // adjust z-index as needed
                }}
              />
            </Grid>

            <Grid item container xs={4}>
              <Grid
                item
                xs={12}
                height="calc((100vh - 64px)/2)"
                maxHeight="calc((100vh - 64px)/2)"
                overflow="hidden"
              >
                <TeamProgress TaskDistributionData={TaskDistributionData} />
              </Grid>
              <Grid
                item
                xs={12}
                height="calc((100vh - 64px)/2)"
                maxHeight="calc((100vh - 64px)/2)"
                overflow="hidden"
              >
                <ProgressBar progressBarData={ProgressBarData} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  } else {
    // Loading backdrop
    return (
      <React.Fragment>
        <Box display="flex" justifyContent="cneter" alignItems="center">
          <LinearProgress color="neutral" variant={"soft"} />
        </Box>
      </React.Fragment>
    );
  }
}
