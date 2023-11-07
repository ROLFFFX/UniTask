import React, { useState } from 'react';
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import add_button_favicon from "../../images/add_button_favicon.png";

function Task({ taskData }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");

  const addSubtask = () => {
    setSubtasks([...subtasks, newSubtask]);
    taskData.subtaskList = subtasks;
    console.log(taskData);  // TODO: Fix bug where the last subtask is not visible in list
    setNewSubtask('');
    setIsAddingSubtask(false);
  };

  return (
    <div className={"task"} key={taskData.id} draggable="true">
        <div className="taskLabel">
        <img src={circle_orange_favicon} alt=""></img>
        {taskData.title}
        <button 
            className="showSubtaskButton" 
            onClick={() => 
            setShowSub(ShowSub==="collapse"? ("expand") :("collapse") )
            }
        >
            <img
            className="showSubtaskButtonImg"
            src={chevron_favicon}
            alt=""
            ></img>
        </button>
        <button 
            className="newSubtaskButton"
            onClick={() => setIsAddingSubtask(true)}
        >
            <img
                className="newSubtaskButtonImg"
                src={add_button_favicon}
                alt={""}
            ></img>
        </button>
        
        </div>
        {ShowSub === "expand" ?
            (<ul className={"subtaskList"}>
            {subtasks.map((subtask, index) => (
                <li
                    className={"subtask"}
                    key={index}
                >
                <input type="checkbox"/>
                {subtask}
                </li>
            ))}
            </ul>)
            : null
        }
        {isAddingSubtask ? (
        <div>
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
          />
          <button 
            className="addSubtaskButton"
            onClick={addSubtask}
          >
            Add Subtask
          </button>
        </div>
      ) : (
        null
      )}
    </div>    
  );
}

export default Task;