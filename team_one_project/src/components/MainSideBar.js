import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import Fab from "@mui/material/Fab";

import { useNavigate } from "react-router-dom";

import { Dashboard } from "./Dashboard/MainDashboard";

export default function TemporaryDrawer() {
  //initialize options for sidebar
  const sidebar_upper = [
    "Dashboard",
    "Sprint Board",
    "Meeting Schedule",
    "Hyperlink Section",
    "Inspect & Adapt",
  ];
  const sidebar_bottom = ["Account", "Settings"];
  const [state, setState] = React.useState({
    left: true,
  });
  //TODO: This handle Click will handle the routing. the identifier can either be text/index
  const handleClick = (text) => {
    alert(text);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 220,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {sidebar_upper.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              {/* TODO: ListItemIcon component is a mui built-in icon API. Need to be updated to our own button */}
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sidebar_bottom.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => handleClick(text)}>
              {/* TODO: ListItemIcon component is a mui built-in icon API. Need to be updated to our own button */}
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Fab
            variant="extended"
            color="info"
            onClick={toggleDrawer(anchor, true)}
          >
            ≡
          </Fab>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
