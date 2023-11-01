import React, { useState } from 'react';
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import add_button_favicon from "../../images/add_button_favicon.png";

function Task({ taskData }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');

  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");

  const addSubtask = () => {
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtask('');
  };

  return (
    <div className={"task"} key={taskData.id}>
        <div className="taskLabel">
        <img src={circle_orange_favicon} alt=""></img>
        {taskData.title}
        <button 
            id="showSubtaskButton" 
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
            id="addSubtaskButton"
            onClick={addSubtask}
        >
            <img
            className="addSubtaskButtonImg"
            src={add_button_favicon}
            alt={""}
            ></img>
        </button>
        <input
        type="text"
        value={newSubtask}
        onChange={(e) => setNewSubtask(e.target.value)}
      />
        </div>
        {ShowSub === "expand" ?
            (<ul className={"subtaskList"}>
            {subtasks.map((subtask, index) => (
                <li
                    className={"subtask"}
                    key={index}
                >
                <img className="subtaskIcon" src={circle_blue_favicon} alt={""}></img>
                {subtask}
                </li>
            ))}
            </ul>)
            : null
        }
    </div>
    
        /*{ShowSub === "expand" ?
            (<ul className={"subtaskList"}>
            {listSub.map((subtask, index) => (
                <li
                    className={"subtask"}
                    key={index}
                >
                <img className="subtaskIcon" src={circle_blue_favicon} alt={""}></img>
                {subtask.description}
                </li>
            ))}
            </ul>)
            : null
        }*/
    
  );
}

export default Task;