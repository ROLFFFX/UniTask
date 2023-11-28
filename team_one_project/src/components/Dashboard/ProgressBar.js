import { Grid, Typography } from "@mui/material";
import React from "react";
import AnimatedProgressBar from "./AnimatedProgressBar";
import HorizontalBarChart from "./HorizontalBarChart";

export default function ProgressBar(ProgressBarData) {
  return (
    <React.Fragment>
      {/* Grid for entire Progress Bar section */}
      <Grid container>
        {/* Grid for Header */}
        <Grid
          item
          xs={12}
          height="calc((100vh - 64px) * 0.2 * 0.2)"
          maxHeight="calc((100vh - 64px) * 0.2 * 0.2)"
          overflow="hidden"
        >
          <Typography marginLeft="10px">
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              Progress Section
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                marginLeft: "12px",
              }}
            >
              Team's Overall Progress on Tasks
            </span>
          </Typography>
        </Grid>
        {/* Grid for interactive stats content */}
        <Grid
          container
          item
          xs={12}
          height="calc((100vh - 64px) * 0.2 * 0.8)"
          maxHeight="calc((100vh - 64px) * 0.2 * 0.8)"
          overflow="hidden"
        >
          {/* Grid For Animated Progress Bar */}
          <Grid item xs={3}>
            <AnimatedProgressBar progressData={ProgressBarData} />
          </Grid>
          {/* Grid For Horizontal bar Chart  */}
          <Grid item xs={9}>
            <HorizontalBarChart progressData={ProgressBarData} />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
