import { Box } from "@mui/material";
import React from "react";
import "../../App.css";
import add_button_favicon from "../../images/add_button_favicon.png";
import chevron_favivon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import "./MainSprintBoard.css";

export function MainSprintBoard() {
  return (
    <Box sx={{ marginLeft: "240px" }}>
      <title>Taskboard</title>
      <div id="main">
        <div className="grid-container" id="board">
          <div className="grid-item" id="tasksHeader">
            <span>Tasks</span>
            <img id="addTaskButton" src={add_button_favicon} alt=""></img>
          </div>
          <div className="grid-item" id="tasks">
            <ul id="taskList">
              <li className="task">
                <div className="taskLabel">
                  <img src={circle_orange_favicon} alt=""></img>
                  Task 1
                  <img
                    className="showSubtaskButton"
                    src={chevron_favivon}
                    alt=""
                  ></img>
                  <img
                    className="addSubtaskButton"
                    src={add_button_favicon}
                    alt={""}
                  ></img>
                </div>
                <ul className="subtaskList">
                  <li className="subtask">
                    <div>
                      <img
                        className="subtaskIcon"
                        src={circle_blue_favicon}
                        alt={""}
                      ></img>
                      <span>Subtask 1</span>
                    </div>
                  </li>
                </ul>
              </li>
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

  /*const [teamName, setTeamName] = useState("Team 1");
    const [tasks, setTasks] = useState([]);
    const [taskNameInput, setTaskNameInput] = useState("");

    const bellButton = () => alert("Bell button clicked");
    const teamSelectButton = () => alert("Team select button clicked");
    const addSubtaskButton = () => alert("Add Subtask button clicked");
    const showSubtasksButton = () => alert("Show Subtasks button clicked");

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
