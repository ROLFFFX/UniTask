import React, { useState, useRef } from "react";
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

      // If needed, can transfer task data
      //e.dataTransfer.setData('application/json', JSON.stringify(taskData)); // Transfer data to main app
    }
  };

  const endDrag = () => {
    if (elementRef.current) {
      elementRef.current.classList.remove("dragging");

      // Set status
      const targetColumn = elementRef.current.parentElement.id;
      const statusByColumn = {
        // Dict with status values corresponding to each column
        tasksColumn: "Not Started",
        todoColumn: "Todo",
        doingColumn: "Doing",
        doneColumn: "Done",
      };
      taskData.status = statusByColumn[targetColumn];
      console.log(taskData);
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
    <div>
      <div
        className={"task"}
        key={taskData.id}
        draggable="true"
        ref={elementRef}
        onDragStart={drag}
        onDragEnd={endDrag}
      >
        <div className="taskLabel">
          {/*<img src={circle_orange_favicon} alt=""></img>*/}
          <span className="taskTitleLabel">{taskData.title}</span>
          <span className="assigneeLabel">{taskData.assignee}</span>
          <button
            className={`showSubtaskButton ${
              ShowSub === "expand" ? "rotate-down" : "rotate-left"
            }`}
            onClick={() => {
              setShowSub(ShowSub === "collapse" ? "expand" : "collapse");
              setIsSettingsOpen(!isSettingsOpen);
            }}
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
        {ShowSub === "expand" ? (
          <ul className={"subtaskList"}>
            {subtasks.map((subtask, index) => (
              <li className={"subtask"} key={index}>
                <input type="checkbox" />
                {subtask}
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
      </div>

      {isSettingsOpen && (
        <div>
          <img className="icon" src={deleteIcon} onClick={deleteTask} />
          <img className="icon" src={editIcon} onClick={editTask} />
        </div>
      )}
    </div>
  );
}

export default Task;
