import { Box } from "@mui/material";
import Task from './Task';
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

export function MainSprintBoard() {

  // List of users (for assignee list)
  const [users, setUsers] = useState([]);
  //const [selectedUser, setSelectedUser] = useState('');

  // Simulate getting the list of users from a database
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
      status: "Not Started",
      taskPoints: taskPointsInput.valueOf(),
      //parentTaskID: null, // TODO: set parent ID if applicable
      //numLayers: 1, // TODO: calculate layer count
      subtaskList: []
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
    // Add a unique id to the task data
    const taskWithId = { ...taskData, id: uuidv4() };
  
    // Add the new task to the tasks array
    setTasks([...tasks, taskWithId]);
  
    // TODO: insert data into database
  };


  const onDragOver = (e) => {
    e.preventDefault(); // Allow the drop
  };

  const onDrop = (e, targetContainerId) => {
    e.preventDefault();
    const currentTask = document.querySelector(".dragging");
    const column = document.getElementById(targetContainerId);
    column.appendChild(currentTask);

  

    /*  // Work in progress
    const bottomTask = insertAboveTask(column, e.clientY);

    if (!bottomTask) {
      column.appendChild(currentTask);
    } else {
      column.insertBefore(currentTask, bottomTask);
    }
    */
    
    /*
    // No current need for this, but if need to extract task data:
    const jsonDataString = e.dataTransfer.getData('application/json'); // Retrieve the JSON string
    const data = JSON.parse(jsonDataString); // Parse the JSON string into an object
    // Can receive all the task data (note: this is a copy of the JSON data, not a reference to the original)
    */
  };
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const editTask = (newTaskData) => {
    const updatedTasks = tasks.map(task => task.id === newTaskData.id ? newTaskData : task);
    setTasks(updatedTasks);
  };

  /*
  // Helper function for drag and drop (work in progress)
  const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.dragging)");
  
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
  
    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();
  
      const offset = mouseY - top;
  
      if (offset < 0 && offset > closestOffset) {
        closestOffset = offset;
        closestTask = task;
      }
    });
  }
  */

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
          <div className="grid-item" id="tasksColumn" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'tasksColumn')}>
  {tasks.map(task => (
    <Task key={task.id} taskData={task} onDelete={deleteTask} onEdit={editTask} />
  ))}
</div>
          <div className="grid-item" id="todoHeader">
            TO DO
          </div>
          <div className="grid-item" id="todoColumn" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'todoColumn')}></div>
          <div className="grid-item" id="doingHeader">
            DOING
          </div>
          <div className="grid-item" id="doingColumn" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'doingColumn')}></div>
          <div className="grid-item" id="doneHeader">
            DONE
          </div>
          <div className="grid-item" id="doneColumn" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'doneColumn')}></div>
        </div>
        
      </div>
      <div>
      
      {tasks.map(task => (
        <Task key={task.id} taskData={task} onDelete={deleteTask} onEdit={editTask} />
      ))}
      
    </div>
    </Box>
  );

}
