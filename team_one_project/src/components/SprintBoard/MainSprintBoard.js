import { Box } from "@mui/material";
import Popper from '@mui/material/Popper';
import React, {useState, useEffect} from "react";
import "../../App.css";
import add_button_favicon from "../../images/add_button_favicon.png";
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import "./MainSprintBoard.css";
import {v4 as uuidv4} from "uuid";

export function MainSprintBoard() {

  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");

  var emptytasks = [];
  const [listTask, setlistTask] = useState(emptytasks);
  
  var emptysubtasks = [];
  const [listSub, setlistSub] = useState(emptysubtasks);

  function addSubtaskButton() {
    const newlist = listSub.concat([
      {
        id: uuidv4(), //to have a stable key attribute for the item
        description: "Subtask"
      },
    ]);
    setlistSub(newlist);
  }

  // Populate assignee list
  const [users, setUsers] = useState([]);
  //const [selectedUser, setSelectedUser] = useState('');

  // Simulate fetching the list of users from a database
  useEffect(() => {
    // Hard code user names for now
    const tempUsers = ["Alec", "Daniel", "Eula", "Francis", "Rolf", "Salina", "Sichen"];
    setUsers(tempUsers);
  }, []);

  // From MUI Popper.js tutorial:
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  // Close popup menu and submit data
  const [teamName, setTeamName] = useState("Team 1");
  const [tasks, setTasks] = useState([]);
  const [taskNameInput, setTaskNameInput] = useState("");
  const [assigneeInput, setAssigneeInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [taskPointsInput, setTaskPointsInput] = useState(1);

  const closeTaskPopup = () => {
   // if (taskNameInput) {
        // TODO: send data to backend
        const taskData = {
          title: taskNameInput.valueOf(),
          assignee: assigneeInput.valueOf(),
          expectedCompleteTime: dueDateInput.valueOf(),
          status: "Not Started", // TODO: get from user
          taskPoints: taskPointsInput.valueOf(),
          parentTaskID: null,  // TODO: set parent ID if applicable
          numLayers: 1 // TODO: calculate layer count
        }
        createTask(taskData);
        displayTask(taskData);

        // Reset input fields
        // TODO: reset all fields
        setTaskNameInput("");
        setTaskPointsInput(1);
   // }
  };

  const createTask = (taskData) => {
    console.log(taskData);
    // TODO: insert data into database
  };

  const displayTask = (taskData) => {
    //setTasks([...tasks, taskData]);
    // Use same logic from addSubtask
    const newlist = listTask.concat([
      {
        id: uuidv4(), //to have a stable key attribute for the item
        title: taskData.title
      },
    ]);
    setlistTask(newlist);
  };

  return (
    <Box sx={{ marginLeft: "240px" }}>
      <title>Taskboard</title>
      <div id="main">
        <div className="grid-container" id="board">
          <div className="grid-item" id="tasksHeader">
            Tasks
              <img id="addTaskButton" aria-describedby={"createTaskMenu"} onClick={handleClick} src={add_button_favicon} alt=""></img>
          </div>
          <Popper id={"createTaskMenu"} open={open} anchorEl={anchorEl}>
            <Box className="popupContent">
              <span>Title: </span>
              <input type='text'
                        id='taskNameInput'
                        value={taskNameInput}
                        onChange={e => setTaskNameInput(e.target.value)}
              ></input>
              <br></br><br></br>
              <span>Assigned to: </span>
              <select name="assigneeInput" 
                      id="assigneeInput"
                      value={assigneeInput}
                      onChange={e => setAssigneeInput(e.target.value)}
              ><option value="">Select User</option>
                {users.map((user, index) => (
                  <option key={index} value={user}>
                    {user}
                  </option>
                ))}
              </select>
              <br></br><br></br>
              <span>Due date: </span>
              <input type='date'
                        id='dueDateInput'
                        value={dueDateInput}
                        onChange={e => setDueDateInput(e.target.value)}
              ></input>
              <br></br><br></br>
              <span>Task Points: </span>
              <input type='number'
                        id='taskPointsInput'
                        value={taskPointsInput}
                        onChange={e => setTaskPointsInput(e.target.value)}
              ></input>
              
              <button id="closeTaskPopupButton" onClick={closeTaskPopup}>Submit</button>
            </Box>
          </Popper>
          <div className="grid-item" id="tasks">
            <ul id={"taskList"}>
              {listTask.map((task) => (
                <li
                    className={"task"}
                    key={task.id}
                >
                  <div className="taskLabel">
                    <img src={circle_orange_favicon} alt=""></img>
                    {task.title}
                    <button id="showSubtaskButton" onClick={() => setShowSub(ShowSub==="collapse"?
                                                                                  ("expand")
                                                                                  :("collapse") )}>
                      <img
                        className="showSubtaskButtonImg"
                        src={chevron_favicon}
                        alt=""
                      ></img>
                    </button>
                    <button id="addSubtaskButton"
                            onClick={() => {
                                        addSubtaskButton();
                                        setAddSub("activated");
                                      }}
                    >
                      <img
                        className="addSubtaskButtonImg"
                        src={add_button_favicon}
                        alt={""}
                      ></img>
                    </button>
                  </div>
                
                  {ShowSub === "expand" ?
                      (<ul className={"subtaskList"}>
                        {listSub.map((subtask) => (
                          <li
                              className={"subtask"}
                              key={subtask.id}
                          >
                            <img className="subtaskIcon" src={circle_blue_favicon} alt={""}></img>
                            {subtask.description}
                          </li>
                        ))}
                      </ul>)
                      : null
                  }
                </li>
              ))}
            </ul>
            
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

  /*const [] = useState("");
    const [] = useState("");

    
  /*const [teamName, setTeamName] = useState("Team 1");
    const [tasks, setTasks] = useState([]);
    const [taskNameInput, setTaskNameInput] = useState("");

    const closeTaskPopup = () => {
        if (taskNameInput) {
            const taskData = { taskName: taskNameInput };
            createTask(taskData);
            displayTask(taskData);
            setTaskNameInput(""); // Reset input field
        }
    }

    const createTask = (taskData) => {
        console.log(taskData);
        // TODO: insert data into database
    }

    const displayTask = (taskData) => {
        setTasks([...tasks, taskData]);
    }*/

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
  /*
    <img id="addTaskButton" src="../../images/add_button_favicon.png" onClick="addTaskButton()"></img>
    <img className="showSubtaskButton" src="../../images/chevron_favicon.png"

                                         onClick="showSubtasksButton()"></img>

    <img className="addSubtaskButton" src="../../images/add_button_favicon.png"
                                         onClick="addSubtaskButton()"></img>
    */
}
