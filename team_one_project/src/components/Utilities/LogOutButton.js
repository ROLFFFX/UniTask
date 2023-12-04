/**
 * @fileoverview This file includes the LogOutButton component, a simple button
 * for logging out users. It calls on the logout functionality in custom useAuth()
 * Hook, which simply redirects the user to loginpage after clearing the global auth
 * info.
 */

import React from "react";
import useAuth from "../../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

/**
 * LogOutButton - A functional component providing a logout button.
 *
 * This component renders a button styled using MUI, with an icon indicating
 * the logout action. Clicking the button triggers the logout function from the useAuth hook,
 * which simply redirects the user to loginpage after clearing the global auth info.
 * This button is currently placed in userprofile page. Another suitable place for it is under
 * the left side bar.
 *
 * @returns {React.ReactElement} A React element representing a logout button.
 */
const LogOutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      style={{ backgroundColor: "#343A40", color: "#E9ECEF", fontSize: "11px" }}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
