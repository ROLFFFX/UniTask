import { Box } from "@mui/material";
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
  const [dueDateInput, setDueDateInput] = useState(""); // state to store expected complete time for adding new task
  const [taskPointsInput, setTaskPointsInput] = useState(1); // state to store taskpoints for adding new task
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
    }
  };

  // Helper function for formatting raw data from GET Method
  const unpackTaskData = (backendTasks) => {
    const reformattedTasks = backendTasks.flatMap((taskList) => {
      const [mainTask, ...subTasks] = taskList;
      return {
        taskID: mainTask.taskId,
        title: mainTask.title,
        assignee: "Unassigned",
        dueDate: mainTask.expectedCompleteTime,
        status: mainTask.status,
        taskPoints: mainTask.taskPoints,
        subtaskList: subTasks.map((subTask) => ({
          taskID: subTask.taskId,
          title: subTask.title,
          assignee: subTask.userName, // Adjust based on your data
          dueDate: subTask.expectedCompleteTime,
          status: subTask.status,
          taskPoints: subTask.taskPoints,
        })),
      };
    });
    setTasks(reformattedTasks);
  };

  // POST Method for adding new Task
  const createTask = (taskData) => {
    // Step 1: Format the request body to be sent
    let dateObject = new Date(taskData.dueDate);
    let isoDateString = dateObject.toISOString();
    const requestBody = {
      title: taskData.title,
      status: taskData.status,
      expectedCompleteTime: isoDateString,
      taskPoints: taskData.taskPoints,
    };
    const assignee = taskData.assignee;
    const taskId = -1; //create Task only create parent task, hence taskId is null. **should be long
    const username = taskData.assignee;
    const jwt = auth.user.userJWT;
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
        console.log("Task created:", response.data); // @todo: response.data contains the created task info.
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      })
      .finally(fetchAllTasks());
  };

  // DELETE Method for Delete Given Task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // PUT Method for Updating Task Info
  const editTask = (newTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === newTaskData.id ? newTaskData : task
    );
    setTasks(updatedTasks);
  };
  /* End of request declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Other Helper Functions-------------------------------------------------------------------------------------------------------------------- */
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
      dueDate: dueDateInput.valueOf(),
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
    setDueDateInput("");
    // }
  };

  // Drag & Drop functionality
  const onDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };
  const onDrop = (e, targetContainerId) => {
    e.preventDefault(); // Allow drop
    const taskId = Number(e.dataTransfer.getData("text/plain"));
    const statusByColumn = {
      // Dict with status values corresponding to each column
      tasksColumn: "Not Started",
      todoColumn: "Todo",
      doingColumn: "Doing",
      doneColumn: "Done",
    };
    const newStatus = statusByColumn[targetContainerId];

    // Update task list to adjust status of dropped task
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const taskIndex = updatedTasks.findIndex(
        (task) => task.taskID === taskId
      );
      const draggedTask = updatedTasks[taskIndex];
      // Remove the task from its current position
      updatedTasks.splice(taskIndex, 1);
      // Insert the task at the bottom of the column
      updatedTasks.push({ ...draggedTask, status: newStatus });
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
  /* End of useEffect Declarations-------------------------------------------------------------------------------------------------------------------- */

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ marginLeft: "200px" }}>
        <title>Taskboard</title>
        <div id="main">
          <div className="grid-container" id="board">
            <div className="grid-item" id="tasksHeader">
              Tasks
              <img
                id="addTaskButton"
                aria-describedby={"createTaskMenu"}
                onClick={openTaskPopup}
                src={add_button_favicon}
                alt=""
              ></img>
            </div>
            <Popper id={"createTaskMenu"} open={open} anchorEl={anchorEl}>
              <Box className="popupContent">
                <span>Title: </span>
                <input
                  type="text"
                  id="taskNameInput"
                  value={taskNameInput}
                  onChange={(e) => setTaskNameInput(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <span>Assigned to: </span>
                <select
                  name="assigneeInput"
                  id="assigneeInput"
                  value={assigneeInput}
                  onChange={(e) => setAssigneeInput(e.target.value)}
                >
                  <option value="Unassigned">Unassigned</option>
                  {users.map((user, index) => (
                    <option key={index} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
                <br></br>
                <br></br>
                <span>Due date: </span>
                <input
                  type="date"
                  id="dueDateInput"
                  value={dueDateInput}
                  onChange={(e) => setDueDateInput(e.target.value)}
                ></input>
                <br></br>
                <br></br>
                <span>Task Points: </span>
                <input
                  type="number"
                  id="taskPointsInput"
                  value={taskPointsInput}
                  onChange={(e) => setTaskPointsInput(e.target.value)}
                ></input>

                <button id="closeTaskPopupButton" onClick={closeTaskPopup}>
                  Submit
                </button>
              </Box>
            </Popper>
            <div
              className="grid-item"
              id="tasksColumn"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, "tasksColumn")}
            >
              {tasks
                .filter((task) =>
                  task.status.toLowerCase().includes("not started")
                )
                .map((task) => (
                  <Task
                    key={task.taskID} // Make sure this is the correct unique identifier
                    taskData={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
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
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("todo"))
                .map((task) => (
                  <Task
                    key={task.id}
                    taskData={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
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
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("doing"))
                .map((task) => (
                  <Task
                    key={task.id}
                    taskData={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
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
            >
              {tasks
                .filter((task) => task.status.toLowerCase().includes("done"))
                .map((task) => (
                  <Task
                    key={task.id}
                    taskData={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
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
