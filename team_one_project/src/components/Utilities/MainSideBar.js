import * as React from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Grid, Button, Paper } from "@mui/material";

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
  const navigate = useNavigate();
  const SideBarContainerStyles = {
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    height: "100vh", // Set the container height to 100% of the viewport height
  };
  //TODO: This handle Click will handle the routing. the identifier can either be text/index
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
        navigate("../hyperlink");
        break;
      case 4:
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
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sidebar_bottom.map((text, index) => (
          <ListItem key={index + 5} disablePadding>
            <ListItemButton onClick={() => handleClick(index + 5)}>
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
          <Grid container direction="column">
            <Grid item xs={2} style={SideBarContainerStyles}>
              <Paper>
                <Button
                  variant="extended"
                  color="info"
                  onClick={toggleDrawer(anchor, true)}
                >
                  ...
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={10}>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </div>
  );
}
