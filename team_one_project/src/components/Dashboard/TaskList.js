import { Box, Grid } from "@mui/material";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TaskList(props) {
  // Extract taskData and formattedTeamMembers from props once
  const { taskData, formattedTeamMembers } = props.props;

  const [formattedTaskData, setFormattedTaskData] = useState([]);

  useEffect(() => {
    const formattedData = taskData.map((taskList) => taskList[0]);
    setFormattedTaskData(formattedData);
  }, [taskData]);

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
    const date = new Date(isoString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")}`;
  }

  return (
    <Box
      height="calc((100vh - 64px) * 0.8 * 0.9)"
      maxHeight="calc((100vh - 64px) * 0.8 * 0.9)"
      style={{ overflow: "auto", justifyContent: "center", display: "flex" }}
      className="custom-scrollbar"
    >
      <Paper
        style={{
          height: "calc((100vh - 64px) * 0.8 * 0.9 - 20px)",
          width: "100%",
        }}
      >
        <TableContainer component={Paper}>
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
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ minWidth: "170px" }}
                  >
                    {formatTaskTitle(task.title)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{task.status}</StyledTableCell>
                  <StyledTableCell align="left" sx={{ minWidth: "70px" }}>
                    {formatAssigneeName(task.taskMemberAssigned.username)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {task.taskPoints}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(task.taskCreationTime)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {formatDate(task.expectedCompleteTime)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
