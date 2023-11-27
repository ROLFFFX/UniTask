import React, { useEffect, useRef, useState } from "react";
import calendar_icon from "../../images/calendar.png";
import points_icon from "../../images/points.png";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Tooltip } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function Task({ taskData, onDelete, onEdit, refreshTasks }) {
  /* Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [AddSub, setAddSub] = useState("idle");
  const [ShowSub, setShowSub] = useState("expand");
  const [backdropOpen, setBackdropOpen] = useState(false); // loading page controller
  const [anchorEl, setAnchorEl] = React.useState(null); //controller: modify task drop down list
  const open = Boolean(anchorEl); //controller: modify task drop down list
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };
  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

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

  const handleTaskMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseTaskMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = () => {
    setOpenDeleteConfirm(true);
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

  // DELETE Method to delete a task
  const deleteTask = async () => {
    setBackdropOpen(true); // Display loading backdrop
    const taskId = taskData.taskID;
    const url = `${ENDPOINT_URL}tasks/deleteTask?taskId=${taskId}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      console.log("Task deleted successfully:", response.data);
      refreshTasks(); // Refresh the tasks to reflect the deletion
    } catch (error) {
      console.error("Error deleting the task:", error);
    } finally {
      setBackdropOpen(false);
      handleCloseTaskMenu(); // Close the task menu
    }
  };
  /* End of Request Declaration-------------------------------------------------------------------------------------------------------------------- */

  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Delete Task Confirmation Pop Up Window */}
      <Modal
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Warning!!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            The deletion of a task is an irreversible action. Please confirm
            that you wish to permanently remove this task.
          </Typography>
          <Grid container marginTop={5}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  handleCloseDeleteConfirm();
                  handleCloseTaskMenu();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteTask();
                }}
              >
                I want to delete it
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <div
        className={"task"}
        key={taskData.taskID}
        draggable="true"
        ref={elementRef}
        onDragStart={(e) => drag(e)}
        onDragEnd={endDrag}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <div className="taskHeader">
          <Tooltip
            title={
              <Typography
                style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
              >
                {taskData.title}
              </Typography>
            }
            arrow
            placement="top"
            TransitionProps={{ timeout: 600 }}
          >
            <div className="taskTitleLabel" style={{ fontSize: "14px" }}>
              {taskData.title}
            </div>
          </Tooltip>
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
            <button
              className="button optionsButton"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleTaskMenu(e)}
            ></button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseTaskMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem
                onClick={handleCloseTaskMenu}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              >
                <EditIcon sx={{ marginRight: 1 }} />
                Modify Task
              </MenuItem>
              <MenuItem
                onClick={handleDeleteTask}
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              >
                <DeleteForeverIcon sx={{ marginRight: 1 }} />
                Delete Task
              </MenuItem>
            </Menu>
          </div>
        </div>

        <div
          className="assigneeLabel"
          style={{ fontSize: "13px", marginLeft: "-10px" }}
        >
          {taskData.assignee}
        </div>
        {ShowSub === "expand" && taskData.subtaskList ? (
          <ul className={"subtaskList"}>
            {taskData.subtaskList.map((subtask, index) => (
              <Tooltip
                title={
                  <Typography
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                    }}
                  >
                    {subtask.title}
                  </Typography>
                }
                arrow
                placement="top"
                TransitionProps={{ timeout: 600 }}
              >
                <li className={"subtask"} key={subtask.taskID}>
                  <input
                    type="checkbox"
                    style={{ display: "none" }}
                    id={`custom-checkbox-${subtask.taskID}`}
                    checked={subtask.status === "Done"}
                    onChange={() => handleCheckboxChange(subtask)}
                  />
                  <label
                    htmlFor={`custom-checkbox-${subtask.taskID}`}
                    style={{
                      display: "inline-block",
                      width: "13px",
                      height: "13px",
                      backgroundColor:
                        subtask.status === "Done" ? "#343A40" : "white",
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      cursor: "pointer",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  ></label>
                  {subtask.title}
                </li>
              </Tooltip>
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
