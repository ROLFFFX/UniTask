import React from "react";
import useAuth from "../../hooks/useAuth"; // Adjust the path to where your useAuth hook is located
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

const LogOutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button
      variant="contained" // This gives the button the primary color
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      style={{ backgroundColor: "#343A40", color: "#E9ECEF", fontSize: "11px" }}
    >
      Logout
    </Button>
  );
};

export default LogOutButton;
