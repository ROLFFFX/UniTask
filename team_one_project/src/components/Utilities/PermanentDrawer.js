import { ThemeProvider, Toolbar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import barTheme from "./barTheme";

const drawerWidth = 200;

export default function PermanentDrawer() {
  const sidebar_upper = [
    "Dashboard",
    "Task Board",
    "Meeting Schedule",
    // "Hyperlink Section",
    "Inspect & Adapt",
  ];
  const sidebar_lower = ["Account", "Settings"];
  const navigate = useNavigate();
  const handleClick = (index) => {
    switch (index) {
      case 0:
        navigate("../dashboard");
        break;
      case 1:
        navigate("../sprintboard");
        break;
      case 2:
        navigate("../meeting");
        break;
      // case 3:
      //   navigate("../hyperlink");
      //   break;
      case 3:
        navigate("../review");
        break;
      case 5:
        navigate("../account");
        break;
      case 6:
        navigate("../setting");
        break;
      default:
        navigate("*");
        break;
    }
  };
  return (
    <ThemeProvider theme={barTheme}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-root": {
            position: "absolute",
          },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "absolute",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <Toolbar />
        <List>
          {sidebar_upper.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(index)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sidebar_lower.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(index + 5)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
