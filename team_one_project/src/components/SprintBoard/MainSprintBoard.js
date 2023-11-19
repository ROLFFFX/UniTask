import { Box } from "@mui/material";
import Task from "./Task";
import Popper from "@mui/material/Popper";
import React, { useState, useEffect } from "react";
import "../../App.css";
import add_button_favicon from "../../images/add_button_favicon.png";
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import deleteIcon from "../../images/delete.png";
import editIcon from "../../images/edit.png";
import settingsIcon from "../../images/dots.png";
import "./MainSprintBoard.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import Backdrop from "@mui/material/Backdrop";
import useAuth from "../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

const dummyTaskfromBackend = [
  {
    taskID: 1,
    taskName: "API implementation",
    userName: "Alec",
    status: "Todo",
    duedate: "2023-12-01",
    taskPoints: "8",
  }, //userName is assignee
  {
    taskID: 2,
    taskName: "Clear up css",
    userName: "Alec",
    status: "Todo",
    duedate: "2023-12-01",
    taskPoints: "5",
  }, //userName is assignee
  {
    taskID: 3,
    taskName: "In progress task",
    userName: "Sichen",
    status: "Doing",
    duedate: "2023-12-01",
    taskPoints: "3",
  }, //userName is assignee
  {
    taskID: 4,
    taskName: "Done task",
    userName: "Rolf",
    status: "Done",
    duedate: "2023-12-01",
    taskPoints: "1",
  }, //userName is assignee
];

export function MainSprintBoard() {
  /* Helper functions for request cycles */
  const { auth } = useAuth();
  const [backdropOpen, setBackdropOpen] = useState(false); //loading page
  const refreshTeamMembers = () => {
    //refetch team member, specifically used after success invitation
    fetchTeamMembers(); // Re-fetch team members
  };
  /* First Step: Getting project members */
  const [users, setUsers] = useState([]);
  const projectTitle = auth.selectedWorkspace;
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
  useEffect(() => {
    // This useEffect hook will refetch the team members. The dependency list is not finalized.
    fetchTeamMembers();
  }, []);
  /* First Step: End of Getting project members */

  // From MUI Popper.js tutorial:
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //const [teamName, setTeamName] = useState("Team 1");
  const [tasks, setTasks] = useState([]);
  const [taskNameInput, setTaskNameInput] = useState("");
  const [assigneeInput, setAssigneeInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [taskPointsInput, setTaskPointsInput] = useState(1);

  // Reformat task data from backend into taskData format
  const unpackTaskData = (backendTasks) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      ...backendTasks.reduce((uniqueTasks, task) => {
        // Check if the taskID already exists in the state
        if (!prevTasks.some((prevTask) => prevTask.taskID === task.taskID)) {
          uniqueTasks.push({
            taskID: task.taskID, // Assuming taskID is a unique identifier
            title: task.taskName,
            assignee: task.userName,
            dueDate: task.duedate,
            status: task.status,
            taskPoints: task.taskPoints,
            subtaskList: [],
          });
        }
        return uniqueTasks;
      }, []),
    ]);
  };

  useEffect(() => {
    unpackTaskData(dummyTaskfromBackend);
  }, []);

  // Show task creation popup menu
  const openTaskPopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Close task popup menu and submit data
  const closeTaskPopup = () => {
    setAnchorEl(null); // Close popup window
    // if (taskNameInput) {
    // TODO: send data to backend
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

  const createTask = (taskData) => {
    // Add the new task to the tasks array
    setTasks([...tasks, taskData]);
    console.log(tasks); // Fix bug where tasks list is always one behind
    // TODO: insert data into database
  };

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

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (newTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === newTaskData.id ? newTaskData : task
    );
    setTasks(updatedTasks);
  };

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
                .filter((task) => task.status.includes("Not Started"))
                .map((task) => (
                  <Task
                    key={task.id}
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
                .filter((task) => task.status.includes("Todo"))
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
                .filter((task) => task.status.includes("Doing"))
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
                .filter((task) => task.status.includes("Done"))
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
