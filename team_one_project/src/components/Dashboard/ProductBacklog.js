import {
  Container,
  Divider,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { green, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export function ProductBacklog() {
  const dummyData = [
    {
      id: 1,
      startTime: "09/01/23",
      endTime: "09/08/23",
      status: "Done",
      tasksDone: 5,
    },
    {
      id: 2,
      startTime: "09/08/23",
      endTime: "09/15/23",
      status: "Done",
      tasksDone: 7,
    },
    {
      id: 3,
      startTime: "09/15/23",
      endTime: "09/22/23",
      status: "Done",
      tasksDone: 8,
    },
    {
      id: 4,
      startTime: "09/22/23",
      endTime: "09/29/23",
      status: "Done",
      tasksDone: 16,
    },
    {
      id: 5,
      startTime: "09/29/23",
      endTime: "10/06/23",
      status: "Done",
      tasksDone: 12,
    },
    {
      id: 6,
      startTime: "10/06/23",
      endTime: "10/13/23",
      status: "Doing",
      tasksDone: 11,
    },
  ];
  return (
    <React.Fragment>
      <Container>
        <div style={{ marginLeft: "0px" }}>
          <h2
            style={{
              fontFamily: "Poppins",
              fontSize: 16,
            }}
          >
            Product Backlog
          </h2>
        </div>
      </Container>
      <Divider></Divider>
      <Container>
        <List sx={{ marginLeft: "-20px" }}>
          {/* Start of List of Sprints */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tasks Done</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              data.status === "Doing" ? green[300] : grey[500],
                          }}
                          alt={index + 1}
                        >
                          {" "}
                        </Avatar>
                      </ListItemAvatar>
                    </ListItem>
                  </TableCell>
                  <TableCell>{data.startTime}</TableCell>
                  <TableCell>{data.endTime}</TableCell>
                  <TableCell>{data.status}</TableCell>
                  <TableCell>{data.tasksDone}</TableCell>
                  <TableCell>
                    <Fab
                      size="small"
                      color="inherit"
                      aria-label="add"
                      sx={{ color: grey[500] }}
                      onClick={() => {
                        alert("Functionality to be determined");
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </List>
      </Container>
    </React.Fragment>
  );
}
