/**
 * @fileoverview This file includes the ProgressBar component, used for displaying
 * a progress checker which occupies the bottom right section of dashboard. It offers
 * a toggle between circular and linear progress views. It's solely an intermediate
 * file for formatting layout and toggle views, it does not process data further.
 */

import styled from "@emotion/styled";
import { Box, Grid, Switch, Typography } from "@mui/material";
import React, { useState } from "react";
import AnimatedProgressBar from "./AnimatedProgressBar";
import HorizontalBarChart from "./HorizontalBarChart";

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

/**
 * ProgressBar - A functional component for rendering a progress checker with toggleable views.
 *
 * This component displays a progress indicator, which can be toggled between a circular
 * (animated) and a horizontal bar chart representation. It utilizes a custom styled switch
 * (GreySwitch) for toggling between these views. The component takes ProgressBarData as its
 * prop to render the appropriate progress visualization.
 *
 * Props:
 * @param {Object} ProgressBarData - The data used to render the progress bar. It should
 *                                   contain the necessary details for both the circular
 *                                   and horizontal bar chart representations.
 *
 * State:
 * @state @type {boolean} isSwitched - Controls which view (circular or horizontal bar chart)
 *                               is currently displayed.
 *
 * The component consists of a header section with a title and switch, followed by the
 * content area that conditionally renders either the AnimatedProgressBar or the
 * HorizontalBarChart component based on the switch's state.
 *
 * @returns {React.ReactElement} A React element representing the progress checker component.
 */
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
          <Grid item xs={9}>
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              align="right"
              marginTop={1}
            >
              See Your Progress in Circular/Linear View:
            </Typography>
          </Grid>
          <Grid item xs={3}>
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
