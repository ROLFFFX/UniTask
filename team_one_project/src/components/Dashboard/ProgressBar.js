import { Box, Grid, Typography, Switch } from "@mui/material";
import React, { useState } from "react";
import AnimatedProgressBar from "./AnimatedProgressBar";
import HorizontalBarChart from "./HorizontalBarChart";
import styled from "@emotion/styled";

const GreySwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#ADB5BD",
    "&:hover": {
      backgroundColor: "#ADB5BD",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#ADB5BD",
  },
  "& .MuiSwitch-thumb": { backgroundColor: "#343A40" },
}));

export default function ProgressBar(ProgressBarData) {
  // handles the hovering and conditional rendering
  const [isSwitched, setIsSwitched] = useState(false);
  const handleSwitchChange = (event) => {
    setIsSwitched(event.target.checked);
  };

  return (
    <React.Fragment>
      <Grid container maxHeight="calc((100vh - 64px)/2)" overflow="hidden">
        <Grid
          container
          item
          xs={12}
          style={{
            height: "calc((100vh - 64px)/2 * 0.15)",
            textAlign: "center",
          }}
        >
          {/* Grid for Big Header */}
          <Grid item xs={12}>
            <Typography
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Progress Checker
            </Typography>
          </Grid>
          {/* Grid for intro under Big Header */}
          <Grid item xs={8}>
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              align="right"
              marginTop={1}
            >
              See You Progress in Circular/Linear View:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box align="left">
              <GreySwitch onChange={handleSwitchChange} />
            </Box>
          </Grid>
        </Grid>
        {/*End of Grid for entire Header */}
        {/* Grid for Progress Circle and Linear Progresses */}
        <Grid
          container
          item
          xs={12}
          style={{
            height: "calc((100vh - 64px)/2 * 0.85)",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isSwitched ? (
            <Grid item xs={12}>
              {/* Display when hovered */}
              <HorizontalBarChart progressData={ProgressBarData} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              {/* Default display when not hovered */}
              <AnimatedProgressBar progressData={ProgressBarData} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
