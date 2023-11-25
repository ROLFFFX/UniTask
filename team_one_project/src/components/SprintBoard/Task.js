import React, { useEffect, useRef, useState } from "react";
import calendar_icon from "../../images/calendar.png";
import points_icon from "../../images/points.png";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Task({ taskData, onDelete, onEdit, refreshTasks }) {
  /* Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");
  const [backdropOpen, setBackdropOpen] = useState(false); // loading page controller

  // Used to reference the current task being dragged
  const elementRef = useRef(null);
  /* End of Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Helper Methods-------------------------------------------------------------------------------------------------------------------- */
  const addSubtask = () => {
    // Create a new subtask object
    const newSubtaskObj = {
      title: newSubtask,
      expectedCompleteTime: "2023-12-01T12:00:00", // dummy date, subtask won't need that
      status: "Not started",
      taskPoints: 1,
    };
    // Update the subtaskList with the new subtask appended at last
    const updatedSubtaskList = [...taskData.subtaskList, newSubtaskObj];
    taskData.subtaskList = updatedSubtaskList;
    // Update the local state for subtasks
    setSubtasks(updatedSubtaskList);
    //call PUT method to insert new taskData in to the db, then call get method again to rerender
    postAddNewSubTask(newSubtaskObj);
    // Reset the newSubtask input field and close the add subtask input
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

  const handleCheckboxChange = (subtask) => {
    const updatedSubtask = {
      ...subtask,
      status: subtask.status === "Done" ? "Not started" : "Done",
    };

    // Update state instead of mutating prop directly
    setSubtasks(
      subtasks.map((st) => (st.taskID === subtask.taskID ? updatedSubtask : st))
    );

    // Send the PUT request to the backend
    updateSubtaskStatus(updatedSubtask);
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
  /* End of Helper Methods-------------------------------------------------------------------------------------------------------------------- */

  /* Request Declaration-------------------------------------------------------------------------------------------------------------------- */
  // POST Method to add new subtask
  const postAddNewSubTask = async (newSubtaskObj) => {
    setBackdropOpen(true); //display loading page
    const taskId = taskData.taskID;
    const assignee = taskData.assignee;
    const projectTitle = auth.selectedWorkspace;
    const url = `${ENDPOINT_URL}tasks/createTask?taskId=${taskId}&projectTitle=${projectTitle}&username=${assignee}`;
    const config = {
      headers: {
        Authorization: `Bearer ${auth.user.userJWT}`,
      },
    };
    try {
      const response = await axios.post(url, newSubtaskObj, config);
      console.log("Updated task successfully.");
      refreshTasks();
    } catch (error) {
      console.error("Error caught on updating a task: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  // PUT Method to update subtask status
  const updateSubtaskStatus = async (subtask) => {
    setBackdropOpen(true); //display loading page
    const taskId = subtask.taskID;
    const url = `${ENDPOINT_URL}tasks/updateTask?taskId=${taskId}&username=null`;
    try {
      const response = await axios.put(url, subtask, {
        headers: { Authorization: `Bearer ${auth.user.userJWT}` },
      });
      console.log("Subtask status updated:", response.data);
      refreshTasks(); // Refresh the task list to reflect changes
    } catch (error) {
      console.error("Error updating subtask status:", error);
    } finally {
      setBackdropOpen(false);
    }
  };
  /* End of Request Declaration-------------------------------------------------------------------------------------------------------------------- */

  // useEffect(() => {
  //   console.log(taskData);
  // }, []);

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
        {ShowSub === "expand" && taskData.subtaskList ? (
          <ul className={"subtaskList"}>
            {taskData.subtaskList.map((subtask, index) => (
              <li className={"subtask"} key={subtask.taskID}>
                <input
                  type="checkbox"
                  checked={subtask.status === "Done"}
                  onChange={() => handleCheckboxChange(subtask)}
                />
                {subtask.title}
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
    </React.Fragment>
  );
}

export default Task;
