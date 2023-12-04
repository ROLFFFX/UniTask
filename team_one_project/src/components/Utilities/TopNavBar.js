/**
 * @fileoverview This file includes the TopAppBar component, which serves as the primary navigation bar
 * for a project management application. It has a LOGO displayed at left, and three functional buttons
 * at right: a hyperlink functionality, a log-out button, and a change workspace button.
 */

import AddLinkIcon from "@mui/icons-material/AddLink";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LinkIcon from "@mui/icons-material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import { ButtonGroup, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import UniTaskLogo_new from "../../images/UniTaskLOGO.PNG";
import barTheme from "./barTheme";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LogOutButton = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <Tooltip
      title={
        <Typography
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "white",
          }}
        >
          Log Out...
        </Typography>
      }
      arrow
      placement="bottom"
      TransitionProps={{ timeout: 600 }}
    >
      <IconButton onClick={handleLogout} sx={{ p: 2 }}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

const ChangeWorkspaceButton = () => {
  const navigate = useNavigate();
  const handleLogoutGroup = () => {
    navigate("/login/login_with_group");
  };
  return (
    <Tooltip
      title={
        <Typography
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "white",
          }}
        >
          Change Workspace
        </Typography>
      }
      arrow
      placement="bottom"
      TransitionProps={{ timeout: 600 }}
    >
      <IconButton onClick={handleLogoutGroup} sx={{ p: 2 }}>
        <Diversity3Icon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

/**
 * TopAppBar - A functional component providing the main navigation and utility bar.
 *
 * This component renders the top app bar of the application with logo, hyperlink drawer toggle,
 * and change workspace and logout. It also contains logic to handle dynamic hyperlinks, allowing
 * users to add, edit, and remove links with custom names.
 *
 * State:
 * @state @type {string} projectTitle - The title of the current project/workspace.
 * @state @type {Array} linksList - Array of hyperlink objects to be displayed in the drawer.
 * @state @type {boolean} state - Boolean state to control the opening and closing of the drawer.
 * @state @type {string} action - State to control the action performed on hyperlinks (e.g., add, edit).
 * @state @type {string} itAction - State to control item-specific actions like edit or remove.
 * @state @type {string} linkName - State to store the name of the new or edited hyperlink.
 * @state @type {string} link - State to store the URL of the new or edited hyperlink.
 * @state @type {Object} anchorElUser - State to manage the anchor element for user menu.
 *
 * @returns {React.ReactElement} A React element representing the top app bar with user interaction features.
 */
export function TopAppBar() {
  const { auth } = useAuth();
  const projectTitle = auth.selectedWorkspace;

  const [linksList, setLinksList] = useState([]);

  const getLinksList = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}hyperlinks/getAllHyperlinks/${projectTitle}`,
        //const response = await axios.get(`http://localhost:8080/getAllHyperlinks/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      // console.log("got links list", response.data);
      setLinksList(response.data);
    } catch (error) {
      console.error("Error getting list", error);
    }
  };

  useEffect(() => {
    getLinksList();
  });

  async function updateLinksList(editedlink, thisid) {
    //e.preventDefault();
    // console.log("edited link", editedlink);
    try {
      await axios.put(
        `${ENDPOINT_URL}hyperlinks/editHyperlink/${thisid}`,
        //const response = await axios.put(`http://localhost:8080/editHyperlink/${editedlink.id}`,
        editedlink,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating list:", error);
    }
  }

  async function deleteLinksList(thisid) {
    try {
      await axios.delete(
        `${ENDPOINT_URL}hyperlinks/deleteHyperlink/${thisid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting link", error);
    }
  }

  async function submitLinksList(newlink) {
    // e.preventDefault();
    try {
      const response = await axios.post(
        `${ENDPOINT_URL}hyperlinks/createHyperlink/${projectTitle}`,
        newlink,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      newlink.hyperlinkId = response.data.hyperlinkId;
    } catch (error) {
      console.error("Error submitting list", error);
    }
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const settings = ["Option to be determined"];

  const [state, setState] = useState(false); //drawer state

  const [action, setAction] = useState("Static"); //actions on add new hyperlink
  const [itAction, setitAction] = useState("Static"); //actions on change/remove list items
  const [linkName, setLinkName] = useState("");
  const [link, setLink] = useState("");

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function changeName(event) {
    setLinkName(event.target.value);
  }
  function changeLink(event) {
    setLink(event.target.value);
  }

  function addLinks() {
    if (!linkName || !link) {
      return;
    }
    const newlink = {
      url:
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`,
      title: linkName,
    };
    setLinksList([...linksList, newlink]);
    submitLinksList(newlink);
  }

  function editLinks(thisid) {
    if (!linkName || !link) {
      return;
    }
    const editedItem = {
      url:
        link.startsWith("http://") || link.startsWith("https://")
          ? link
          : `http://${link}`,
      title: linkName,
    };
    const index = linksList.findIndex((item) => item.hyperlinkId === thisid);
    const newlist = linksList.with(index, editedItem);
    setLinksList(newlist);
    updateLinksList(editedItem, thisid);
  }

  function removeLinks(thisid) {
    const newlist = linksList.filter(
      (userlink) => userlink.hyperlinkId !== thisid
    );
    setLinksList(newlist);
    deleteLinksList(thisid);
  }

  const toggleDrawer = (event) => {
    setState(event);
  };

  function cancelAction() {
    setAction("Static");
    setitAction("Static");
    setLink("");
    setLinkName("");
  }

  const list = () => (
    <Box sx={{ width: "auto", marginTop: "70px" }} role="presentation">
      <ListItemButton
        id="addlinkbutton"
        onClick={() => setAction("Add Item")}
        disabled={itAction !== "Static"}
      >
        <ListItemIcon>
          <AddLinkIcon />
        </ListItemIcon>
        <ListItemText primary={"Add a New Hyperlink"} />
      </ListItemButton>
      <form noValidate autoComplete={"off"}>
        {linksList.map((userlink) =>
          itAction === userlink.hyperlinkId ? (
            <ListItem>
              <TextField
                label="Edit Name"
                variant="outlined"
                defaultValue={userlink.title}
                onChange={(event) => changeName(event)}
                error={!linkName}
                helperText={!linkName ? "Name Cannot Be Empty" : null}
              />
              <TextField
                label="Edit Link"
                variant="outlined"
                defaultValue={userlink.url}
                onChange={(event) => changeLink(event)}
                error={!link}
                helperText={!link ? "Link Cannot Be Empty" : null}
              />
              <ButtonGroup>
                <Button
                  onClick={() => {
                    if (link && linkName) {
                      editLinks(userlink.hyperlinkId);
                      setitAction("Static");
                      setLink("");
                      setLinkName("");
                    }
                  }}
                >
                  Save Edit
                </Button>
                <Button onClick={() => cancelAction()}>Cancel</Button>
              </ButtonGroup>
            </ListItem>
          ) : (
            <ListItem
              key={userlink.hyperlinkId}
              onMouseOver={() =>
                itAction !== "Static" && itAction !== "Remove or Change?"
                  ? null
                  : setitAction("Remove or Change?")
              }
              onMouseOut={() =>
                itAction !== "Static" && itAction !== "Remove or Change?"
                  ? null
                  : setitAction("Static")
              }
              disablePadding
            >
              <ListItemButton
                href={userlink.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemText primary={userlink.title} />
              </ListItemButton>

              {itAction === "Remove or Change?" ? (
                <ButtonGroup>
                  <Button
                    onClick={() => {
                      removeLinks(userlink.hyperlinkId);
                      setitAction("Static");
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    onClick={() => {
                      setAction("Display");
                      setitAction(userlink.hyperlinkId);
                      setLinkName(userlink.title);
                      setLink(userlink.url);
                    }}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              ) : null}
            </ListItem>
          )
        )}
        {action === "Add Item" ? (
          <ListItem>
            <TextField
              label="Customize a Name"
              variant="outlined"
              onChange={(event) => changeName(event)}
              error={!linkName}
              helperText={!linkName ? "Name Cannot Be Empty" : null}
            />
            <TextField
              label="Copy Link Here"
              variant="outlined"
              onChange={(event) => changeLink(event)}
              error={!link}
              helperText={!link ? "Link Cannot Be Empty" : null}
            />
            <ButtonGroup>
              <Button
                onClick={() => {
                  if (link && linkName) {
                    addLinks();
                    setAction("Display");
                    setLink("");
                    setLinkName("");
                  }
                }}
              >
                Save
              </Button>
              <Button onClick={() => cancelAction()}>Cancel</Button>
            </ButtonGroup>
          </ListItem>
        ) : null}
      </form>
    </Box>
  );

  return (
    <ThemeProvider theme={barTheme}>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#343A40",
          zIndex: 1201,
          height: "64px",
          width: "100%",
        }}
      >
        <Toolbar disableGutters>
          <Container maxWidth={false}>
            <Box display="flex" alignItems="center" width="100%" height="64px">
              {/* <Box border={1} borderColor="red"> */}
              <Avatar src={UniTaskLogo_new} sx={{ height: 80, width: 80 }} />
              {/* </Box> */}
              {/* Flex Box spacer */}
              <Box flexGrow={1}></Box>
              {/* For Hyperlink section */}
              <Tooltip
                title={
                  <Typography
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "white",
                    }}
                  >
                    See Your Hyperlinks
                  </Typography>
                }
                arrow
                placement="top"
                TransitionProps={{ timeout: 600 }}
              >
                <IconButton
                  style={{ color: "white" }}
                  onClick={() => {
                    state === false ? toggleDrawer(true) : toggleDrawer(false);
                    cancelAction();
                  }}
                  sx={{ p: 2 }}
                >
                  <LinkIcon />
                  {/* For Top Right Button / User */}
                </IconButton>
              </Tooltip>
              {/* Dropdown Menu on LogOut and Change Workspace */}
              <ChangeWorkspaceButton />
              <LogOutButton />
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={state}
        onClose={() => {
          toggleDrawer(false);
          cancelAction();
        }}
      >
        {list()}
      </Drawer>
    </ThemeProvider>
  );
}
