import { Box, Button, Toolbar, Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import unitaskIcon from "../../images/UTLogo.png";
import SwipeableCarouselWinodw from "./SwipeableCarouselWindow";

const slideInFromAbove = `
@keyframes fadeSlideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`;

const slideInFromBelow = `
@keyframes slideInFromBelow {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`;

const fadeIn = `
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./login");
  };

  const GetStartedButton = () => {
    return (
      <Button
        variant="contained"
        style={{
          fontFamily: "Montserrat, sans-serif",
          backgroundColor: "#E9ECEF",
          color: "#212529",
          fontSize: "14px",
          marginTop: "20px",
          padding: "20px 40px",
          animation: "fadeIn 2s ease-in",
        }}
        onClick={handleClick}
      >
        {"Get Started >"}
      </Button>
    );
  };

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
      bgcolor="#212529"
    >
      <style>{fadeIn}</style>
      <style>{slideInFromBelow}</style>
      <style>{slideInFromAbove}</style>
      <Grid container direction="row">
        <Grid item xs={12}>
          {/* Welcome Header */}
          <Box marginTop={5} style={{ animation: "fadeSlideIn 1.5s ease-out" }}>
            {/* <style>{slideInFromAbove}</style> */}
            <Grid container direction="row">
              <Grid
                item
                xs={3.5}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "50px",
                }}
              >
                {/* white background of Icon */}
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#CED4DA",
                    borderRadius: "50%",
                    width: "108px",
                    height: "108px",
                  }}
                >
                  <Avatar
                    src={unitaskIcon}
                    alt="UniTask Logo"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={7}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  fontSize="60px"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  color="#E9ECEF"
                >
                  Welcome to UniTask!
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12}></Grid>
          {/* introduction line below header */}
          <Grid item xs={12}>
            <Box style={{ animation: "slideInFromBelow 1.5s ease-out" }}>
              {/* <style>{slideInFromBelow}</style> */}
              <Typography
                fontSize="20px"
                style={{ fontFamily: "Montserrat, sans-serif" }}
                marginTop={5}
                marginLeft={10}
                marginRight={10}
                color="#E9ECEF"
              >
                The innovative web app tailored for university students to
                experience the agile methodology in action. UniTask transforms
                the way teams collaborate, plan, and execute projects with its
                intuitive, scrum-inspired design.
              </Typography>
            </Box>
          </Grid>
          {/* get started button */}
          <Grid item xs={12}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%", // Adjust this as needed
              }}
            >
              <GetStartedButton />
            </Box>
          </Grid>
          {/* sliding menu */}
          <Grid item xs={12}>
            <Box
              style={{
                opacity: 0,
                animation: "slideInFromBelow 2s ease-out 0.5s forwards",
              }}
            >
              <style>{slideInFromBelow}</style>
              <SwipeableCarouselWinodw />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
