/**
 * @fileoverview This file defines the UserProfile component, which displays user profile info
 * in MainAccount Page. It uses MUI components and icons for layout and styling. The component is
 * part of the User Interfeace module for managing user profiles.
 */

import BadgeIcon from "@mui/icons-material/Badge";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import PortraitIcon from "@mui/icons-material/Portrait";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import LogOutButton from "../Utilities/LogOutButton";

/**
 * UserProfile - A functional component for displaying user profile information.
 *
 * This component renders a user's profile information, including username, email, and group
 * information. It utilizes MUI's Box, Typography, Divider, and Button components for
 * styling and layout. Icons from MUI are used to visually represent different sections
 * of the profile, such as email and group information. The component also includes two buttons
 * to change the workspace or log-out with current account.
 *
 * The component fetches the username using an Axios call  displays it along with the user's email
 * and current workspace. A backdrop with a circular progress indicator is shown while the username
 * is being fetched.
 *
 * Usage:
 * This component should be rendered within a React application where user profile management
 * is needed.
 *
 * State:
 * - userName: string - Stores the fetched username.
 * - backdropOpen: boolean - Controls the visibility of the loading indicator.
 *
 * Note:
 * - The component requires authentication context from useAuth hook for functionality.
 *
 * @returns {ReactElement} A React element representing the user profile interface.
 */
export default function UserProfile() {
  /* Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */
  /**
   * Authentication context from the useAuth hook.
   * @type {{auth: Object, setAuth: Function}}
   */
  const { auth, setAuth } = useAuth();

  /**
   * State hook for managing the username.
   * @type {Array<string>}
   */
  const [userName, setUserName] = useState("");

  /**
   * Navigation hook from react-router-dom for navigation.
   * @type {Function}
   */
  const navigate = useNavigate();

  /**
   * State hook for managing the visibility of the loading backdrop.
   * @type {Array<boolean>}
   */
  const [backdropOpen, setBackdropOpen] = useState(false); //loading page

  /* End of Hooks Declarations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests-------------------------------------------------------------------------------------------------------------------- */
  /**
   * Asynchronously fetches the username from the server.
   * On success, updates the authentication context and userName state.
   * Shows a loading indicator during the request to better handle the
   * async state.
   */
  const fetchUserName = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(`${ENDPOINT_URL}users/getUsername`, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      setAuth({ ...auth, userName: response.data });
      setUserName(response.data);
    } catch (error) {
      console.error("Error fetching username:", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  /* End of Requests-------------------------------------------------------------------------------------------------------------------- */

  /* Other-------------------------------------------------------------------------------------------------------------------- */
  /**
   * Handles user logout and navigates to the group login page.
   */
  const handleLogoutGroup = () => {
    navigate("/login/login_with_group");
  };

  /**
   * useEffect hook to fetch user name on component mount. Note that the dependency list
   * is empty, which means that it only runs at initial rendering.
   */
  useEffect(() => {
    fetchUserName();
  }, []);

  /**
   * Constructs a user information object based on the current state and authentication context.
   * It was initially wrapped in an useEffect hook and is placed after fetchUserName(). Or else JSX component
   * will be rendered before it receives UserInfo at rare cases.
   * @type {{username: string, email: string, group_title: string}}
   */
  const UserInfo = {
    username: userName,
    email: auth.user.userEmail,
    group_title: auth.selectedWorkspace,
  };
  /* Other-------------------------------------------------------------------------------------------------------------------- */

  return (
    <Box>
      {/* Back Drop for loading state */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Box for Your Profile Card in center */}
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Box for header section */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PortraitIcon style={{ marginRight: 8 }} />
          <Typography
            sx={{
              color: "#343A40",
              fontSize: 20,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Your Profile
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        {/* Box for Username */}
        <Box style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon />
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
            {UserInfo.username}
          </Typography>
        </Box>
        {/* Box for user email */}
        <Box style={{ display: "flex", alignItems: "center" }}>
          <EmailIcon />
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Email: </span>
            {UserInfo.email}
          </Typography>
        </Box>
        {/* Box for current workspace */}
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <GroupsIcon />
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 14,
              flexGrow: 1,
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Current Workspace:</span>{" "}
            {UserInfo.group_title}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ChangeCircleIcon />}
            onClick={handleLogoutGroup}
            style={{
              backgroundColor: "#343A40",
              color: "#E9ECEF",
              fontSize: "11px",
            }}
          >
            Change Workspace
          </Button>
        </Box>
        <Toolbar></Toolbar>
        <LogOutButton />
      </Box>
    </Box>
  );
}
