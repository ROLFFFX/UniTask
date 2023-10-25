import { Box } from "@mui/material";
import React, {useState} from "react";
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
  function deleteSubtaskButton(subtaskID) {
    const updatedList = listSub.filter((subtask) => subtask.id !== subtaskID);
    setlistSub(updatedList);
  }
  {ShowSub === "expand" ? (
    <ul className={"subtaskList"}>
      {listSub.map((subtask) => (
        <li className={"subtask"} key={subtask.id}>
          <img
            className="subtaskIcon"
            src={circle_blue_favicon}
            alt={""}
          ></img>
          {subtask.description}
          <button
            className="deleteSubtaskButton"
            onClick={() => deleteSubtaskButton(subtask.id)}
          >
            Delete Subtask
          </button>
        </li>
      ))}
    </ul>
  ) : null}
    

  return (
    <Box sx={{ marginLeft: "240px" }}>
      <title>Taskboard</title>
      <div id="main">
        <div className="grid-container" id="board">
          <div className="grid-item" id="tasksHeader">
            Tasks
            <img id="addTaskButton" src={add_button_favicon} alt=""></img>
          </div>
          <div className="grid-item" id="tasks">
            <ul id="taskList">
              <li className="task">
                <div className="taskLabel">
                  <img src={circle_orange_favicon} alt=""></img>
                  Task 1
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

    function bellButton()
    {
      alert("Bell button clicked");
    }

    function teamSelectButton()
    {
      alert("Team select button clicked");
    }*/
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
