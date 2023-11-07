import BadgeIcon from "@mui/icons-material/Badge";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import PortraitIcon from "@mui/icons-material/Portrait";
import { Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../Utilities/LogOutButton";

const dummyUserInfo = {
  username: "Yuxuan Shi",
  email: "shiyuxuanrolf@gmail.com",
  group_title: "UniTask",
};

export default function UserProfile() {
  const navigate = useNavigate();
  const handleLogoutGroup = () => {
    navigate("/login/login_with_group");
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
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
              fontSize: 16,
            }}
          >
            <pre></pre>
            Username: {dummyUserInfo.username}
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
              fontSize: 16,
            }}
          >
            Email: {dummyUserInfo.email}
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
              fontSize: 16,
              flexGrow: 1,
            }}
          >
            Current Workspace: {dummyUserInfo.group_title}
          </Typography>
          <Button
            variant="contained" // This gives the button the primary color
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
