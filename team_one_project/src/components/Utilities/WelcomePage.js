import { Box, Button, Toolbar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/backgroundImage.jpg";

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./login");
  };
  return (
    <Box
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <Button
        variant="contained"
        sx={{ marginTop: "500px" }}
        style={{
          backgroundColor: "#212529",
          color: "#F8F9FA",
          fontSize: "11px",
          justifyContent: "center",
        }}
        onClick={handleClick}
        size="large"
      >
        {"Get Started >"}
      </Button>
    </Box>
  );
}
