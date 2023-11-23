import { Box, Button, Toolbar, Grid, Typography, Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../images/backgroundImage.jpg";
import unitaskIcon from "../../images/UTLogo.png";

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("./login");
  };
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Grid container direction="row">
        <Grid item xs={12}>
          <Box border={1}>
            <Grid container direction="row">
              <Grid
                item
                xs={3.5}
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "50px",
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
              </Grid>
              <Grid
                item
                xs={7}
                spacing={2}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  fontSize="60px"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Welcome to UniTask!
                </Typography>
              </Grid>
            </Grid>

            {/* <Box
              style={{
                backgroundImage: `url(${welcome_header})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100vw",
                height: "30vh",
              }}
              sx={{
                marginTop: "50px",
              }}
            ></Box> */}
          </Box>
        </Grid>
      </Grid>

      {/* <Button
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
      </Button> */}
    </Box>
  );
}
