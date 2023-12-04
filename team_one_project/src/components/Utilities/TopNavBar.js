/**
 * @fileoverview
 * This file includes the TopAppBar component, which serves as the primary navigation bar
 * for a project management application. It has a LOGO displayed at left, and three functional buttons
 * at right: a hyperlink functionality, a log-out button, and a change workspace button.
 *
 * Components:
 * - LogOutButton: A functional component that renders a log-out button with tooltip.
 * - ChangeWorkspaceButton: A functional component that renders a change workspace button with tooltip.
 * - Hyperlinks functionality: Including a button to toggle a drawer that contains a dynamic list of hyperlinks that can be added, edited, and deleted by the user.
 *
 * Dependencies:
 * - React and Material UI libraries are primary dependencies.
 * - Axios is used for API calls.
 * - The component also uses custom hooks and assets like `useAuth` and `UniTaskLogo_new`.
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

/**
 * LogOutButton - Functional component to render a log-out button.
 *
 * This component creates a log-out button with an icon. When clicked, it triggers the logout
 * function from the authentication context to log the user out of the application. It also displays
 * a tooltip with the text "Log Out..." on hover.
 *
 * Utilizes Material UI's IconButton, Tooltip, and Typography components to create the button with
 * a styled tooltip. The LogoutIcon from Material UI icons is used for the button's icon.
 *
 * @returns {React.ReactElement} A React element representing the logout button with a tooltip.
 */
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

/**
 * ChangeWorkspaceButton - Functional component to render a change workspace button.
 *
 * This component creates a button for changing the user's current workspace. Clicking the button
 * navigates the user to a specified route ('/login/login_with_group') to handle workspace change.
 * It also features a tooltip with the text "Change Workspace" on hover.
 *
 * Implements navigation using the 'useNavigate' hook from 'react-router-dom'. The button is created
 * using Material UI's IconButton and Tooltip components, and the Diversity3Icon for the button's icon.
 *
 * @returns {React.ReactElement} A React element representing the change workspace button with a tooltip.
 */
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

  /**
   * getLinksList - Asynchronously fetches a list of hyperlinks for the current project.
   *
   * This function makes an HTTP GET request to retrieve all hyperlinks associated with the
   * current project. It uses Axios for the request, with the project's title appended to the URL
   * and JWT authorization in the header. The fetched data is then set to the linksList state.
   *
   * @async
   * @function
   * @throws Will log an error to the console if the request fails.
   */
  const getLinksList = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}hyperlinks/getAllHyperlinks/${projectTitle}`,
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

  /**
   * updateLinksList - Asynchronously updates a specific hyperlink in the list.
   *
   * This function sends an HTTP PUT request to update an existing hyperlink. It requires the edited
   * link object and its unique identifier. The request is sent with JSON content-type and JWT
   * authorization headers. The function is used to save edits made to a hyperlink.
   *
   * @async
   * @function
   * @param {Object} editedlink - The edited hyperlink object containing updated data.
   * @param {string} thisid - The unique identifier of the hyperlink object to be updated.
   * @throws Will log an error to the console if the update fails.
   */
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

/**
 * deleteLinksList - Asynchronously deletes a specific hyperlink from the list.
 *
 * This function performs an HTTP DELETE request to remove a hyperlink. It requires the unique
 * identifier of the hyperlink to be deleted. The request is made with JSON content-type and
 * JWT authorization headers.
 *
 * @async
 * @function
 * @param {string} thisid - The unique identifier of the hyperlink objrct to be deleted.
 * @throws Will log an error to the console if the deletion fails.
 */
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

/**
 * submitLinksList - Asynchronously adds a new hyperlink to the list.
 *
 * This function is responsible for submitting a new hyperlink. It sends an HTTP POST request
 * with the new link data. The project title is appended to the URL, and the request is sent with
 * JSON content-type and JWT authorization headers. The response includes the ID of the new link,
 * which is then appended to the link object.
 *
 * @async
 * @function
 * @param {Object} newlink - The new hyperlink object to be added.
 * @throws Will log an error to the console if the submission fails.
 */
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

  // State declarations for the component
  const [anchorElUser, setAnchorElUser] = React.useState(null); // State for anchor element in user menu
  const settings = ["Option to be determined"];

  const [state, setState] = useState(false); // State to control the opening/closing of the hyperlinks drawer
  const [action, setAction] = useState("Static"); // State to manage actions on adding a new hyperlink
  const [itAction, setitAction] = useState("Static"); // State to manage actions on changing/removing hyperlinks list items
  const [linkName, setLinkName] = useState(""); // State to store the name of the hyperlink
  const [link, setLink] = useState(""); // State to store the URL of the hyperlink


/**
 * handleCloseUserMenu - Closes the user menu.
 *
 * This function resets the anchorElUser state to null, effectively closing user menu.
 */
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

/**
 * changeName - Updates the linkName state based on user input.
 *
 * @param {Object} event - The event object from the input field, contains the user inputted name for the link
 */
  function changeName(event) {
    setLinkName(event.target.value);
  }

/**
 * changeLink - Updates the link URL state based on user input.
 *
 * @param {Object} event - The event object from the input field, contains the user inputted link
 */
  function changeLink(event) {
    setLink(event.target.value);
  }

/**
 * addLinks - Adds a new hyperlink to the list.
 *
 * This function creates a new hyperlink object and adds it to the links list state. It also
 * calls the submitLinksList function to handle the submission of the new link to the backend.
 * It checks for the validity of the link name and URL before adding.
 */
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

/**
 * editLinks - Edits an existing hyperlink in the list.
 *
 * This function updates an existing hyperlink based on the given ID. It checks for the validity
 * of the updated link name and URL before updating. It also updates the local state and calls
 * updateLinksList to handle the backend update.
 *
 * @param {string} thisid - The unique ID of the hyperlink object to be edited.
 */
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

/**
 * removeLinks - Removes a hyperlink from the list.
 *
 * This function deletes a hyperlink based on the given ID. It updates the local state and calls
 * deleteLinksList to handle the removal in the backend.
 *
 * @param {string} thisid - The unique ID of the hyperlink object to be removed.
 */
  function removeLinks(thisid) {
    const newlist = linksList.filter(
      (userlink) => userlink.hyperlinkId !== thisid
    );
    setLinksList(newlist);
    deleteLinksList(thisid);
  }

/**
 * toggleDrawer - Toggles the state of the drawer.
 *
 * This function is used to open or close the hyperlink management drawer based on the user's action.
 *
 * @param {boolean} event - The boolean value to set the drawer's open/close state.
 */
  const toggleDrawer = (event) => {
    setState(event);
  };

/**
 * cancelAction - Resets the hyperlink action states.
 *
 * This function is used to reset the states related to hyperlink actions to their default values.
 */
  function cancelAction() {
    setAction("Static");
    setitAction("Static");
    setLink("");
    setLinkName("");
  }

/**
 * list - A functional component that renders a list of hyperlink management options.
 *
 * This function returns a Material UI Box component containing a list of hyperlink-related actions.
 * It includes an 'Add New Hyperlink' button and dynamically renders a list of existing hyperlinks,
 * each with options to edit or remove. The component also provides input fields for adding or
 * editing hyperlink names and URLs.
 *
 * The function uses the Material UI components such as Box, ListItemButton, TextField, and ButtonGroup
 * for rendering the UI elements. It utilizes the component state such as 'action' and 'itAction' to
 * determine the current action to be performed (add, edit, or remove hyperlinks).
 *
 * The list dynamically changes based on user interaction, allowing for real-time addition, edition,
 * or deletion of hyperlinks in the list.
 *
 * @returns {React.ReactElement} A React element representing a list of hyperlink management options.
 */
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
