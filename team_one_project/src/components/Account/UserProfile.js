import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";

const dummyUserInfo = {
  username: "Rolf",
  email: "shiyuxuanrolf@gmail.com",
};

export default function UserProfile() {
  return (
    <div>
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
          <PortraitIcon style={{ marginRight: 8 }} />
          <Typography sx={{ color: "#343A40", fontSize: 20 }}>
            Your Profile
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        {/* usernmae */}
        <Box style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon style={{ marginRight: 8 }} />
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 16,
            }}
          >
            Username: {dummyUserInfo.username}
          </Typography>
        </Box>
        {/* user email */}
        <Box style={{ display: "flex", alignItems: "center" }}>
          <BadgeIcon style={{ marginRight: 8 }} />
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
      </Box>
    </div>
  );
}
