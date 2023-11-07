import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Box, ThemeProvider, Toolbar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "./LogOutButton";
import barTheme from "./barTheme";

const drawerWidth = 200;

export default function PermanentDrawer() {
  const displayIcon = (index) => {
    switch (index) {
      case 0:
        return <DashboardIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 1:
        return <AssignmentIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 2:
        return <MeetingRoomIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 3:
        return <RateReviewIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 5:
        return <GroupsIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 6:
        return <AccountCircleIcon sx={{ marginLeft: 1, color: "#495057" }} />;
      case 7:
        return (
          <SettingsApplicationsIcon sx={{ marginLeft: 1, color: "#495057" }} />
        );
    }
  };
  const sidebar_upper = [
    "Dashboard",
    "Task Board",
    "Meeting Schedule",
    "Inspect & Adapt",
  ];
  const sidebar_lower = ["Manage Workspace", "Account", "Settings"];
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
      case 3:
        navigate("../review");
        break;
      case 5:
        navigate("../manageteam");
        break;
      case 6:
        navigate("../account");
        break;
      case 7:
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
              {displayIcon(index)}
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
              {displayIcon(index + 5)}
              <ListItemButton onClick={() => handleClick(index + 5)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* spacer used to align logout button with bottom of drawer */}
        <Box style={{ flexGrow: 1 }} />
        <LogOutButton></LogOutButton>
      </Drawer>
    </ThemeProvider>
  );
}
