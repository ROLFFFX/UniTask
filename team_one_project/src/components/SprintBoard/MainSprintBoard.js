import { Box } from "@mui/material";
import Task from './Task';
import Popper from "@mui/material/Popper";
import React, { useState, useEffect } from "react";
import "../../App.css";
import add_button_favicon from "../../images/add_button_favicon.png";
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import "./MainSprintBoard.css";
import { v4 as uuidv4 } from "uuid";

export function MainSprintBoard() {

  // List of users (for assignee list)
  const [users, setUsers] = useState([]);
  //const [selectedUser, setSelectedUser] = useState('');

  // Simulate fetching the list of users from a database
  useEffect(() => {
    // Hard code user names for now
    const tempUsers = [
      "Alec",
      "Daniel",
      "Eula",
      "Francis",
      "Rolf",
      "Salina",
      "Sichen",
    ];
    setUsers(tempUsers);
  }, []);

  // From MUI Popper.js tutorial:
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  //const [teamName, setTeamName] = useState("Team 1");
  const [tasks, setTasks] = useState([]);
  const [taskNameInput, setTaskNameInput] = useState("");
  const [assigneeInput, setAssigneeInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [taskPointsInput, setTaskPointsInput] = useState(1);

  // Show task creation popup menu
  const openTaskPopup = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Close task popup menu and submit data
  const closeTaskPopup = () => {
    setAnchorEl(null);  // Close popup window
    // if (taskNameInput) {
    // TODO: send data to backend
    const taskData = {
      title: taskNameInput.valueOf(),
      assignee: assigneeInput.valueOf(),
      expectedCompleteTime: dueDateInput.valueOf(),
      status: "Not Started", // TODO: get from user
      taskPoints: taskPointsInput.valueOf(),
      //parentTaskID: null, // TODO: set parent ID if applicable
      //numLayers: 1, // TODO: calculate layer count
      subtaskList: []
    };
    createTask(taskData);

    // Reset input fields
    // TODO: add more fields
    setTaskNameInput("");
    setTaskPointsInput(1);
    // }
  };

  const createTask = (taskData) => {
    // Add task into tasks array
    setTasks([...tasks, taskData]);
    console.log(tasks);
    // TODO: insert data into database
  };


  // Handle drag and drop
  // TODO: Don't hard code column names, instead select all columns via class
  // (sloppy temp solution implemented because don't know how to add multiple classes in React)
  const draggables = document.querySelectorAll(".task");
  const tasksColumn = document.getElementById("tasksColumn");
  const todoColumn = document.getElementById("todoColumn");
  const doingColumn = document.getElementById("doingColumn");
  const doneColumn = document.getElementById("doneColumn");
  const columns = [tasksColumn, todoColumn, doingColumn, doneColumn]

  
  draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("dragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
    });
  });

  columns.forEach((column) => {
    if (column) {
      column.addEventListener("dragover", (e) => {
        e.preventDefault();
        const currentTask = document.querySelector(".dragging");
        column.appendChild(currentTask);
      });
    }
  });

  return (
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
          <div className="grid-item" id="tasksColumn">
            {tasks.map((task, index) => (
              <Task key={index} taskData={task} />
            ))}
          </div>
          <div className="grid-item" id="todoHeader">
            TO DO
          </div>
          <div className="grid-item" id="todoColumn"></div>
          <div className="grid-item" id="doingHeader">
            DOING
          </div>
          <div className="grid-item" id="doingColumn"></div>
          <div className="grid-item" id="doneHeader">
            DONE
          </div>
          <div className="grid-item" id="doneColumn"></div>
        </div>
      </div>
    </Box>
  );


  /*
    STUFF IN RETURN
            {tasks.map(task => (
                <li className='task' key={task.taskName}>
                </li>
            ))}
            <div id='createTaskMenu' className='popup'>
                <div className='popupContent'>
                    <input
                        type='text'
                        id='taskNameInput'
                        value={taskNameInput}
                        onChange={e => setTaskNameInput(e.target.value)}
                    />
                    <button id='closeTaskPopupButton' onClick={closeTaskPopup}>
                        Submit
                    </button>
                </div>
            </div>
    */

  /*<div id="createTaskMenu" className="popup">
                    <div className="popupContent">
                        <input type="text" id="taskNameInput"></input>
                        <button id="closeTaskPopupButton" onClick="closeTaskPopup()">Submit</button>
                    </div>
                </div> */

}
