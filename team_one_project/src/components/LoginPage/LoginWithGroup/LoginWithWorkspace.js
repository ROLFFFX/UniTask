/**
 * @fileoverview This file includes the LoginWithGroup component, which is used
 * for displaying a list of workspaces for a user to log in. The chosen workspace
 * will be stored in global auth state.
 */

import Diversity3Icon from "@mui/icons-material/Diversity3";
import LoginIcon from "@mui/icons-material/Login";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList } from "react-window";
import useAuth from "../../../hooks/useAuth";
import { ENDPOINT_URL } from "../../../hooks/useConfig";

/**
 * renderWorkspaceRow - Renders an individual row in the list of workspaces. It's the standard practice for working with react-window.
 *
 * This helper function is used within the LoginWithGroup component to render each workspace as a clickable list item Button.
 * It handles the display and truncation of the workspace title and attaches an onClick event to navigate to the selected workspace.
 *
 * @param {Object} props - Props containing the index and style for the list item.
 * @param {Array} workspaces - Array of workspace titles.
 * @param {Function} handleClick - Function to handle the click event on the list item.
 * @returns {React.ReactElement} A React element representing a single row in the workspace list.
 */
function renderWorkspaceRow(props, workspaces, handleClick) {
  //handles the rendering of each workspace
  const { index, style } = props;
  const workspaceTitle = workspaces[index];
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton onClick={() => handleClick(index)}>
        <Diversity3Icon sx={{ marginLeft: 10 }} />
        <ListItemText
          primary={
            workspaceTitle.length > 30
              ? `${workspaceTitle.substring(0, 30)}...`
              : workspaceTitle
          }
          sx={{
            "& .MuiListItemText-primary": {
              fontFamily: "Inter, sans-serif",
            },
            marginLeft: 5,
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

/**
 * LoginWithGroup - A functional component for displaying a list of workspaces for user login, and redirects the user to dashboard
 * page with chosen workspace.
 *
 * This component renders a list of workspaces that a user is part of, allowing them to select and log in to a specific workspace.
 * It uses the react-window (FixedSizeList) component to render a large virtualized list of workspaces (with renderWorkspaceRow helper
 * function rendering each workspace).
 *
 * State:
 * @state @type {Array} workspaces - Array of workspace titles fetched from the server.
 * @state @type {boolean} backdropOpen - Boolean to control the display of the loading backdrop.
 *
 * The component fetches the user's workspaces from the server on mount and updates the state accordingly.
 * It provides a user interface for workspace selection and handles navigation to the selected workspace.
 *
 * @returns {React.ReactElement} A React element representing the list of workspaces for user login.
 */
export default function LoginWithGroup() {
  const { auth, setAuth } = useAuth();
  const token = auth.user.userJWT;
  const [workspaces, setWorkspaces] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false); //loading page

  useEffect(() => {
    const fetchUserWorkspaces = async () => {
      setBackdropOpen(true); //display loading page
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${ENDPOINT_URL}projects/getUserWorkspaces`,
          config
        );
        if (response.status === 200) {
          setWorkspaces(response.data.map((project) => project.projectTitle));
        } else if (response.status === 204) {
          console.log("No workspaces found for the user");
        }
      } catch (error) {
        console.error("Error fetching workspaces: ", error);
      } finally {
        setBackdropOpen(false);
      }
    };
    fetchUserWorkspaces();
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/dashboard");
  };
  const handleClick = (index) => {
    //setAuth
    const selectedWorkspaceTitle = workspaces[index];
    setAuth({ ...auth, selectedWorkspace: selectedWorkspaceTitle });
    navigate("/dashboard");
  };
  return (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <LoginIcon style={{ marginRight: 8 }} />
          <Typography
            sx={{ color: "#343A40", fontSize: 25 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Login to Your Workspace
          </Typography>
        </Box>

        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        <Typography
          sx={{
            color: "#343A40",
            padding: 1,
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 3,
            marginBottom: 3,
          }}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          We detect that you are currently in these workspaces below. Please
          click the one you want to log in with. (*You might scroll this list.)
        </Typography>
        <FixedSizeList
          height={190}
          width={500}
          itemSize={46}
          itemCount={workspaces.length}
          overscanCount={5}
        >
          {(props) => renderWorkspaceRow(props, workspaces, handleClick)}
        </FixedSizeList>
      </Box>
    </React.Fragment>
  );
}
