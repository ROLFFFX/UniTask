import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./login");
  };
  return (
    <React.Fragment>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#343A40",
          color: "#E9ECEF",
          fontSize: "11px",
        }}
        onClick={handleClick}
      >
        Get Started
      </Button>
    </React.Fragment>
  );
}
