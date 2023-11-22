import BadgeIcon from "@mui/icons-material/Badge";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../Utilities/LogOutButton";
import useAuth from "../../hooks/useAuth";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import axios from "axios";

export default function UserProfile() {
  const { auth, setAuth } = useAuth();

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const handleLogoutGroup = () => {
    navigate("/login/login_with_group");
  };
  const fetchUserName = async () => {
    //fetch User Name
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
  useEffect(() => {
    fetchUserName();
  }, []);

  const [backdropOpen, setBackdropOpen] = useState(false); //loading page
  const UserInfo = {
    // username: auth.user.userName,  @todo to be implemented
    username: userName,
    email: auth.user.userEmail,
    group_title: auth.selectedWorkspace,
  };
  // console.log(UserInfo);

  return (
    <div>
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
          // maxWidth: "lg",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PortraitIcon style={{ marginRight: 8 }} />
          <Typography sx={{ color: "#343A40", fontSize: 20 }}>
            Your Profile
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        {/* usernmae */}

        <Box style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon />

          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 14,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Username:</span>{" "}
            {UserInfo.username}
          </Typography>
        </Box>
        {/* user email */}
        <Box style={{ display: "flex", alignItems: "center" }}>
          <EmailIcon />
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 14,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Email: </span>
            {UserInfo.email}
          </Typography>
        </Box>
        {/* group name */}
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
    </div>
  );
}
