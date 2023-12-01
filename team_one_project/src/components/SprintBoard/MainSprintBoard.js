import { Box, Button, Typography, Grid, Tooltip } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Popper from "@mui/material/Popper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import add_button_favicon from "../../images/add_button_favicon.png";
import "./MainSprintBoard.css";
import Task from "./Task";

export function MainSprintBoard() {
  /* useState Declarations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth(); // auth state to retrieve project title, currently signed in user email and user name
  const [backdropOpen, setBackdropOpen] = useState(false); // loading page controller
  const [users, setUsers] = useState([]); // state to store team members
  const projectTitle = auth.selectedWorkspace; // project title
  const [anchorEl, setAnchorEl] = useState(null); // adding task popper controller
  const open = Boolean(anchorEl); // adding task popper controller
  const [teamName, setTeamName] = useState(projectTitle); //teamName is initialized as the projectTitle and updated at global auth state.
  const [unformattedTasks, setUnformattedTasks] = useState(); //state to store raw tasks fetched from GET
  const [tasks, setTasks] = useState([]); // state to store all tasks fetched from GET
  const [taskNameInput, setTaskNameInput] = useState(""); // state to store task name input for adding new task
  const [assigneeInput, setAssigneeInput] = useState(""); // state to store assignee input for adding new task
  const [expectedCompleteTimeInput, setexpectedCompleteTimeInput] =
    useState(""); // state to store expected complete time for adding new task
  const [taskPointsInput, setTaskPointsInput] = useState(1); // state to store taskpoints for adding new task
  const [openSpotlight, setOpenSpotlight] = useState(false);
  /* End of useState Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests declarations-------------------------------------------------------------------------------------------------------------------- */
  // GET Method for fetching Team Members in current workpsace
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
      // Set Users
      setUsers(parsedTeamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // GET Method for fetching all Tasks in current workspace
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
      setUnformattedTasks(response.data);
      console.log("Done fetching tasks successfully!");
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // Helper function for formatting raw data from GET Method
  // Controls the intermediate stage of converting raw data to what's rendered on page
  const unpackTaskData = (backendTasks) => {
    const reformattedTasks = backendTasks.flatMap((taskList) => {
      const [mainTask, ...subTasks] = taskList;
      return {
        taskID: mainTask.taskId,
        title: mainTask.title,
        // render task member assigned if there is one, else "Unassigneds"
        assignee:
          mainTask.taskMemberAssigned && mainTask.taskMemberAssigned.username
            ? mainTask.taskMemberAssigned.username
            : "Unassigned",
        expectedCompleteTime: mainTask.expectedCompleteTime
          ? mainTask.expectedCompleteTime.split("T")[0] //Extract only the Date part, excluding time in day
          : null,
        status: mainTask.status,
        taskPoints: mainTask.taskPoints,
        subtaskList: subTasks.map((subTask) => ({
          taskID: subTask.taskId,
          title: subTask.title,
          assignee:
            subTask.taskMemberAssigned && subTask.taskMemberAssigned.username
              ? subTask.taskMemberAssigned.username
              : "Unassigned",
          expectedCompleteTime: subTask.expectedCompleteTime,
          status: subTask.status,
          taskPoints: subTask.taskPoints,
        })),
      };
    });
    setTasks(reformattedTasks);
  };

  // POST Method for adding new Task
  const createTask = (taskData) => {
    setBackdropOpen(true); //display loading page
    // Step 1: Format the request body to be sent
    let dateObject = new Date(taskData.expectedCompleteTime);
    let isoDateString = dateObject
      ? randomizeDateObject(dateObject).toISOString()
      : null;
    const requestBody = {
      title: taskData.title,
      status: taskData.status,
      expectedCompleteTime: isoDateString,
      taskPoints: taskData.taskPoints,
    };
    const assignee = taskData.assignee;
    const taskId = -1; //create Task only create parent task, hence taskId is null. **should be long
    axios
      .post(
        `${ENDPOINT_URL}tasks/createTask?taskId=${taskId}&projectTitle=${projectTitle}&username=${assignee}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      )
      .then((response) => {
        // refetch all tasks and rerender page
        fetchAllTasks();
        console.log("Task created."); // response.data contains the created task info.
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
      .finally(fetchAllTasks(), setBackdropOpen(false));
  };

  // PUT Method for updating Task Status
  const updateTaskStatus = async (task, newStatus) => {
    const url = `${ENDPOINT_URL}tasks/updateTask?taskId=${task.taskID}&username=null`; // Adjust the URL as needed
    const formattedDate = formatDate(task.expectedCompleteTime); // Format the date
    const payload = {
      title: task.title,
      status: newStatus,
      taskPoints: task.taskPoints,
      expectedCompleteTime: formattedDate,
    };

    try {
      const response = await axios.put(url, payload, {
        headers: { Authorization: `Bearer ${auth.user.userJWT}` },
      });
      console.log("Task status updated.");
      fetchAllTasks(); // Refresh the task list after updating
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  /* End of request declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Other Helper Functions-------------------------------------------------------------------------------------------------------------------- */
  // randomize the hour / minutes / seconds of dateObject to avoid collision
  function randomizeDateObject(dateObject) {
    if (!dateObject) return null;

    const now = new Date();
    dateObject.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    return dateObject;
  }

  // randomize the hour / minutes / seconds of ISOString Object to avoid collision
  function randomizeISOString(dateString) {
    if (!dateString) return null;

    const dateObject = new Date(dateString);
    const now = new Date();

    dateObject.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    return dateObject;
  }

  // Controller: open adding new task popper
  const openTaskPopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Controller: close adding new task popper
  // when closing popper, it also handles submitting the request and calls POST Method for adding new task
  const closeTaskPopup = () => {
    setAnchorEl(null); // Close popup window
    const taskData = {
      title: taskNameInput.valueOf(),
      assignee: assigneeInput.valueOf(),
      expectedCompleteTime: expectedCompleteTimeInput.valueOf(),
      status: "Not Started",
      taskPoints: taskPointsInput.valueOf(),
      //parentTaskID: null, // TODO: set parent ID if applicable
      //numLayers: 1, // TODO: calculate layer count
      subtaskList: [],
    };
    createTask(taskData);
    // Reset input fields
    setTaskNameInput("");
    setTaskPointsInput(1);
    setAssigneeInput("Unassigned");
    setexpectedCompleteTimeInput("");
    // }
  };

  // convert string "YYYY-MM-DD" to Date object
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    // Append a default time if your backend requires LocalDateTime
    return [year, month, day].join("-") + "T00:00:00"; // Adjust time as needed
  };

  // Drag & Drop functionality
  const onDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const onDrop = (e, targetContainerId) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("text/plain"));
    const statusByColumn = {
      tasksColumn: "Not Started",
      todoColumn: "To Do",
      doingColumn: "Doing",
      doneColumn: "Done",
    };
    const newStatus = statusByColumn[targetContainerId];

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const taskIndex = updatedTasks.findIndex(
        (task) => task.taskID === taskId
      );
      if (taskIndex > -1) {
        const updatedTask = { ...updatedTasks[taskIndex], status: newStatus };
        updatedTasks.splice(taskIndex, 1);
        updatedTasks.push(updatedTask);

        updateTaskStatus(updatedTask, newStatus); // Update task status in backend
      }
      return updatedTasks;
    });
  };

  /* End of Other Helper Functions-------------------------------------------------------------------------------------------------------------------- */

  /* useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */
  /* useEffect order should not be altered as it strictly instructs the rendering order logic */
  useEffect(() => {
    fetchAllTasks();
    // GET all tasks from backend
  }, []);

  useEffect(() => {
    if (unformattedTasks) {
      unpackTaskData(unformattedTasks);
    }
  }, [unformattedTasks]);
  useEffect(() => {
    // This useEffect hook will refetch the team members for initial rendering. The dependency list is not finalized.
    fetchTeamMembers();
  }, []);
  const refreshTeamMembers = () => {
    //refetch team member, specifically used after success invitation
    fetchTeamMembers(); // Re-fetch team members
  };
  useEffect(() => {
    setOpenSpotlight(tasks.length === 0);
  }, [tasks]);
  /* End of useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */

  if (backdropOpen || !unformattedTasks || !tasks) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ marginLeft: "200px" }}>
        <title style={{ fontFamily: "Inter, sans-serif" }}>Taskboard</title>
        <div id="main">
          <div className="grid-container" id="board">
            <div
              className="grid-item"
              id="tasksHeader"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Tasks
              {/* Add new task button */}
              {/* Spotlight effect if tasks.length is 0, indicating that there is no task. */}
              <Tooltip
                title={
                  <Typography
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Welcome, new user!
                    <br />
                    Please click here to create your first Task.
                  </Typography>
                }
                arrow
                placement="bottom"
                TransitionProps={{ timeout: 600 }}
                open={openSpotlight}
                onClose={() => setOpenSpotlight(false)}
              >
                <img
                  id="addTaskButton"
                  aria-describedby={"createTaskMenu"}
                  onClick={openTaskPopup}
                  src={add_button_favicon}
                  onMouseEnter={() => setOpenSpotlight(false)}
                  alt=""
                ></img>
              </Tooltip>
            </div>
            <Popper id={"createTaskMenu"} open={open} anchorEl={anchorEl}>
              <Box
                className="popupContent"
                sx={{ fontFamily: "Inter, sans-serif", fontSize: "15px" }}
              >
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "18px",
                      marginBottom: 3,
                    }}
                  >
                    Create New Task
                  </Typography>
                </Box>
                <span>Title: </span>
                <input
                  type="text"
                  id="taskNameInput"
                  value={taskNameInput}
                  onChange={(e) => setTaskNameInput(e.target.value)}
                  style={{ marginLeft: "10px" }}
                ></input>
                <br></br>
                <br></br>
                <span>Assigned to: </span>
                <select
                  name="assigneeInput"
                  id="assigneeInput"
                  value={assigneeInput}
                  onChange={(e) => setAssigneeInput(e.target.value)}
                  style={{
                    marginLeft: "10px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <option value="Unassigned">Unassigned</option>
                  {users.map((user, index) => (
                    <option
                      key={index}
                      value={user}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {user}
                    </option>
                  ))}
                </select>
                <br></br>
                <br></br>
                <span>Due date: </span>
                <input
                  type="date"
                  id="expectedCompleteTimeInput"
                  value={expectedCompleteTimeInput}
                  onChange={(e) => setexpectedCompleteTimeInput(e.target.value)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    marginLeft: "10px",
                  }}
                ></input>
                <br></br>
                <br></br>
                <span>Task Points: </span>
                <input
                  type="number"
                  id="taskPointsInput"
                  value={taskPointsInput}
                  onChange={(e) => setTaskPointsInput(e.target.value)}
                  style={{ marginLeft: "10px" }}
                ></input>

                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "30px",
                      }}
                    >
                      <Button
                        onClick={closeTaskPopup}
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                        variant="outlined"
                        color="inherit"
                        disabled={
                          !taskNameInput ||
                          !assigneeInput ||
                          !expectedCompleteTimeInput ||
                          !taskPointsInput
                        }
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "15px",
                      }}
                    >
                      <Typography
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11.5px",
                        }}
                      >
                        *Please Complete All Fields to Submit Form
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Popper>
            <div
              className="grid-item"
              id="tasksColumn"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "tasksColumn")}
              style={{
                overflowY: "auto", // Adds vertical scrollbar when needed
                maxHeight: "calc(100vh - 185px)", // Adjust the 100px to account for headers/footers
              }}
            >
              {tasks
                .filter((task) =>
                  task.status.toLowerCase().includes("not started")
                )
                .map((task) => (
                  <Task
                    key={task.taskID} // Make sure this is the correct unique identifier
                    taskData={task}
                    refreshTasks={fetchAllTasks} // pass down prop to control rerender of tasks
                    users={users}
                  />
                ))}
            </div>
            <div className="grid-item" id="todoHeader">
              TO DO
            </div>
            <div
              className="grid-item"
              id="todoColumn"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "todoColumn")}
              style={{
                overflowY: "auto", // Adds vertical scrollbar when needed
                maxHeight: "calc(100vh - 185px)", // Adjust the 100px to account for headers/footers
              }}
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("to do"))
                .map((task) => (
                  <Task
                    key={task.taskID}
                    taskData={task}
                    refreshTasks={fetchAllTasks} // pass down prop to control rerender of tasks
                    users={users}
                  />
                ))}
            </div>
            <div className="grid-item" id="doingHeader">
              DOING
            </div>
            <div
              className="grid-item"
              id="doingColumn"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "doingColumn")}
              style={{
                overflowY: "auto", // Adds vertical scrollbar when needed
                maxHeight: "calc(100vh - 185px)", // Adjust the 100px to account for headers/footers
              }}
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("doing"))
                .map((task) => (
                  <Task
                    key={task.taskID}
                    taskData={task}
                    refreshTasks={fetchAllTasks} // pass down prop to control rerender of tasks
                    users={users}
                  />
                ))}
            </div>
            <div className="grid-item" id="doneHeader">
              DONE
            </div>
            <div
              className="grid-item"
              id="doneColumn"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "doneColumn")}
              style={{
                overflowY: "auto", // Adds vertical scrollbar when needed
                maxHeight: "calc(100vh - 185px)", // Adjust the 100px to account for headers/footers
              }}
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("done"))
                .map((task) => (
                  <Task
                    key={task.taskID}
                    taskData={task}
                    refreshTasks={fetchAllTasks} // pass down prop to control rerender of tasks
                    users={users}
                  />
                ))}
            </div>
          </div>
        </div>
        <div></div>
      </Box>
    </React.Fragment>
  );
}
