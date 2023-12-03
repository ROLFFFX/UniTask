/**
 * @fileoverview This file includes the TaskList component, which is used
 * for displaying a list of tasks in a table format. It occupies the entire
 * right part of dashbaord when user is in dashbaord - table task view.
 */

import { Box, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import "./TaskList.css";

// Styling for entire background of Table Cell. Modifies font and color of head and body of table.
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    // color: theme.palette.common.white,
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    backgroundColor: "white",
  },
}));

// Styling for each row that the table renders. Modifies uniform bgcolor.
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * TaskList - A functional component for rendering a list of tasks and could filter by user.
 *
 * This component displays tasks in a table format, including details like title, status,
 * assignee, task points, and dates. It handles data formatting and provides tooltips for
 * displaying full task titles and assignee names(especially when item is truncated when too
 * long). The component receives task data and formatted team member information through props.
 * It also provides option to reformat the table, filter through selected usernmae.
 *
 * Props:
 * @param {Object} props - The props passed to the TaskList component.
 * @param {Array} props.taskData - The task data to be displayed in the table.
 * @param {Array} props.formattedTeamMembers - The formatted team member data.
 *
 * State:
 * @state @type {Array} formattedTaskData - The state for storing formatted task data based on the props.
 *
 * The component renders a table with custom styled cells and rows. Each table cell has
 * tooltips for extended information. The task data is filtered and formatted based on the
 * provided team member information.
 *
 * @returns {React.ReactElement} A React element representing the task list table.
 */
export default function TaskList(props) {
  const { taskData, formattedTeamMembers } = props.props;
  const [formattedTaskData, setFormattedTaskData] = useState([]);

  // applies filter that reformat the taskData according to the username user chooses to render
  const applyFilter = () => {
    if (formattedTeamMembers) {
      return taskData
        .map((taskList) => taskList[0])
        .filter(
          (task) => task.taskMemberAssigned.username === formattedTeamMembers
        );
    } else {
      return taskData.map((taskList) => taskList[0]);
    }
  };

  // Use useEffect to listen to changes in formattedTeamMembers
  useEffect(() => {
    const updatedTaskData = applyFilter();
    setFormattedTaskData(updatedTaskData);
  }, [formattedTeamMembers, taskData]);

  const formatAssigneeName = (name) => {
    if (name.length > 10) {
      return `${name.substring(0, 10)}...`;
    }
    return name;
  };

  const formatTaskTitle = (title) => {
    if (title.length > 25) {
      return `${title.substring(0, 25)}...`;
    }
    return title;
  };

  function formatDate(isoString) {
    // handles truncation
    const date = new Date(isoString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")}`;
  }

  function formatISOString(isoString) {
    // handles reformatting it to be more readable
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <Box
      height="calc((100vh - 64px) * 0.9)"
      maxHeight="calc((100vh - 64px) * 0.9)"
      style={{ overflow: "auto", justifyContent: "center", display: "flex" }}
      className="custom-scrollbar"
    >
      {/* <Paper
        style={{
          height: "calc((100vh - 64px) * 0.9)",
          width: "100%",
        }}
      > */}
      <TableContainer component={Paper} className="custom-scrollbar">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Assignee</StyledTableCell>
              <StyledTableCell align="left">Points</StyledTableCell>
              <StyledTableCell align="left">Create Date</StyledTableCell>
              <StyledTableCell align="left">Due Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedTaskData.map((task) => (
              <StyledTableRow key={task.taskId}>
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {task.title}
                    </Typography>
                  }
                  arrow
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ minWidth: "170px" }}
                  >
                    {formatTaskTitle(task.title)}
                  </StyledTableCell>
                </Tooltip>
                <StyledTableCell align="left">{task.status}</StyledTableCell>
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {task.taskMemberAssigned.username}
                    </Typography>
                  }
                  arrow
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <StyledTableCell align="left" sx={{ minWidth: "70px" }}>
                    {formatAssigneeName(task.taskMemberAssigned.username)}
                  </StyledTableCell>
                </Tooltip>
                <StyledTableCell align="left">
                  {task.taskPoints}
                </StyledTableCell>
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {formatISOString(task.taskCreationTime)}
                    </Typography>
                  }
                  arrow
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <StyledTableCell align="left">
                    {formatDate(task.taskCreationTime)}
                  </StyledTableCell>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      {formatISOString(task.taskCreationTime)}
                    </Typography>
                  }
                  arrow
                  placement="top"
                  TransitionProps={{ timeout: 600 }}
                >
                  <StyledTableCell align="left">
                    {formatDate(task.expectedCompleteTime)}
                  </StyledTableCell>
                </Tooltip>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* </Paper> */}
    </Box>
  );
}
