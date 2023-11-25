import React, { useState, useRef } from "react";
import points_icon from "../../images/points.png";
import calendar_icon from "../../images/calendar.png";
import chevron_favicon from "../../images/chevron_favicon.png";
import circle_blue_favicon from "../../images/circle_blue_favicon.png";
import circle_orange_favicon from "../../images/circle_orange_favicon.png";
import add_button_favicon from "../../images/add_button_favicon.png";
import deleteIcon from "../../images/delete.png";
import editIcon from "../../images/edit.png";
import settingsIcon from "../../images/dots.png";

function Task({ taskData, onDelete, onEdit }) {
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");

  // Used to reference the current task being dragged
  const elementRef = useRef(null);

  const addSubtask = () => {
    setSubtasks([...subtasks, newSubtask]);
    taskData.subtaskList = subtasks;
    console.log(taskData); // TODO: Fix bug where the last subtask is not visible in list
    setNewSubtask("");
    setIsAddingSubtask(false);
  };

  // Add dragging capability
  // When item is dragged, give it the dragging class
  const drag = (e) => {
    if (elementRef.current) {
      elementRef.current.classList.add("dragging");
      e.dataTransfer.setData("text/plain", taskData.taskID);

      // If needed, can transfer task data
      //e.dataTransfer.setData('application/json', JSON.stringify(taskData)); // Transfer data to main app
    }
  };

  const endDrag = () => {
    if (elementRef.current) {
      elementRef.current.classList.remove("dragging");
    }
  };

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const deleteTask = () => {
    onDelete(taskData.id);
  };

  const editTask = () => {
    const newTaskName = prompt("Enter new task name");
    if (newTaskName) {
      const newTaskData = { ...taskData, title: newTaskName };
      onEdit(newTaskData);
    }
  };

  return (
    <div
      className={"task"}
      key={taskData.taskID}
      draggable="true"
      ref={elementRef}
      onDragStart={(e) => drag(e)}
      onDragEnd={endDrag}
    >
      <div className="taskHeader">
        <div className="taskTitleLabel">{taskData.title}</div>
        <div className="buttonsContainer">
          <button
            className={`button showSubtaskButton ${
              ShowSub === "expand" ? "rotate-down" : "rotate-left"
            }`}
            onClick={() => {
              setShowSub(ShowSub === "collapse" ? "expand" : "collapse");
              setIsSettingsOpen(!isSettingsOpen);
            }}
          ></button>
          <button
            className="button newSubtaskButton"
            onClick={() => setIsAddingSubtask(true)}
          ></button>
          <button className="button optionsButton"></button>
        </div>
      </div>

      <div className="assigneeLabel">{taskData.assignee}</div>

      {/* {ShowSub === "expand" ? (
        <ul className={"subtaskList"}>
          {subtasks.map((subtask, index) => (
            <li className={"subtask"} key={index}>
              <input type="checkbox" />
              {subtask}
            </li>
          ))}
        </ul>
      ) : null} */}
      {ShowSub === "expand" && taskData.subtaskList ? (
        <ul className={"subtaskList"}>
          {taskData.subtaskList.map((subtask, index) => (
            <li className={"subtask"} key={subtask.taskID}>
              <input type="checkbox" />
              {subtask.title} {/* Displaying the title of the subtask */}
            </li>
          ))}
        </ul>
      ) : null}

      {isAddingSubtask ? (
        <div>
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
          />
          <button className="addSubtaskButton" onClick={addSubtask}>
            Add Subtask
          </button>
        </div>
      ) : null}

      <div className="taskInfo">
        <span className="taskPoints">
          <img className="icon" src={points_icon}></img>
          {taskData.taskPoints}
        </span>
        <span className="dueDateLabel">
          <img className="icon" src={calendar_icon}></img>
          {taskData.dueDate}
        </span>
      </div>
    </div>
  );
}

export default Task;
