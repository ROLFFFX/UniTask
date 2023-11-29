import { Backdrop, Box, CircularProgress, Divider, Grid } from "@mui/material";
import axios from "axios";
import * as React from "react";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import { TeamProgress } from "./TeamProgress";
import { BurndownChart } from "./BurndownChart";
import ProgressBar from "./ProgressBar";
import TaskView from "./TaskView";
import "./TaskList.css";
import LinearProgress from "@mui/joy/LinearProgress";

export function DashboardContent() {
  /* Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [backdropOpen, setBackdropOpen] = React.useState(false); //loading page
  const projectTitle = auth.selectedWorkspace; // for current project title
  const [TaskDistributionData, setTaskDistributionData] = React.useState(); // Task distribution among groups
  const [ProgressBarData, setProgressBarData] = React.useState(); // Progress Bar: task done / undone
  const [formattedTeamMembers, setFormattedTeamMembers] = React.useState(); // team members
  const [allTasks, setAllTasks] = React.useState();
  /* End of Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests Declarations-------------------------------------------------------------------------------------------------------------------- */
  // GET Method to retrieve task distribution among team members.

  // response.data:
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
  // response.data:
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
  // [userName, userName, userName]
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

  /* End of Helper Functions Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */
  React.useEffect(() => {
    fetchTaskDistributionAmongTeamMembers();
    fetchProgressBarData();
    fetchTeamMembers();
    fetchAllTasks();
  }, []);

  // @ todo: part inside this if statement is rendered after all data are fetched.
  // @ todo: if not, render backdrop
  if (TaskDistributionData && ProgressBarData && formattedTeamMembers) {
    // console.log("Data Fetched: ");
    // console.log(TaskDistributionData, ProgressBarData);
    // console.log(formattedTeamMembers);
  }

  /* End of useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */
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
            <Grid container item xs={7} style={{ position: "relative" }}>
              {/* Grid for task list */}
              <Grid
                item
                xs={12}
                height="calc(100vh - 64px)"
                maxHeight="calc(100vh - 64px)"
                overflow="hidden"
                className="custom-scrollbar"
              >
                <TaskView
                  taskData={allTasks}
                  formattedTeamMembers={formattedTeamMembers}
                />
              </Grid>
              {/* Grid for PorgressBar
              <Grid
                item
                xs={12}
                height="calc((100vh - 64px) * 0.2)"
                maxHeight="calc((100vh - 64px) * 0.2)"
                overflow="hidden"
              >
                <ProgressBar progressBarData={ProgressBarData} />
              </Grid> */}
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
            <Grid item container xs={5}>
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
    return (
      <React.Fragment>
        <Box display="flex" justifyContent="cneter" alignItems="center">
          <LinearProgress color="neutral" variant={"soft"} />
        </Box>
      </React.Fragment>
    );
  }
}
