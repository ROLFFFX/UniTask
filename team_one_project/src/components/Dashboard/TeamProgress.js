import { Container, Divider, Fab } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { grey } from "@mui/material/colors";
import React from "react";

export function TeamProgress() {
  const dummyData = [
    { id: 1, name: "Bim Bim", tasksDone: 9, initial: "BB" },
    { id: 2, name: "Bam Bam", tasksDone: 7, initial: "BB" },
    { id: 3, name: "Bob's Burger", tasksDone: 5, initial: "BB" },
    { id: 4, name: "Björk Guðmundsdóttir", tasksDone: 6, initial: "BG" },
  ];
  return (
    <React.Fragment>
      <Container>
        <div style={{ marginLeft: "150px" }}>
          <h2
            style={{
              fontFamily: "Poppins",
              fontSize: 16,
            }}
          >
            Member Contribution
          </h2>
        </div>
      </Container>
      <Divider />
      <Container>
        <List
          sx={{
            height: "100%",
            maxHeight: 360,
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {dummyData.map((member) => (
            <ListItem key={member.id}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: grey[600] }} alt={member.id.toString()}>
                  {member.initial}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={member.name}
                secondary={`${member.tasksDone} Tasks Done`}
              />
              <Fab
                size="small"
                onClick={() => {
                  alert(member.name);
                }}
              ></Fab>
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}
