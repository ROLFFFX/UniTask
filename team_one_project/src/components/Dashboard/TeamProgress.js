/**
 * @fileoverview This file includes the TeamProgress component, which is used for
 * displaying a pie chart representation of task distribution among team members.
 * The center of pie chart renders the task member when user hover on the part of
 * pie chart.
 */

import { Backdrop, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";

/**
 * CustomLabel - A functional component for rendering custom labels on a VictoryPie chart.
 *
 * @param {Object} props - Including datum for the pie slice data.
 *
 * @returns {React.ReactElement} A React element representing the custom label with tooltip.
 */
function CustomLabel(props) {
  const { datum } = props;
  const tooltipText = `${datum.x}`;
  return (
    <g>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        text={tooltipText}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "black" }}
      />
    </g>
  );
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

/**
 * TeamProgress - A functional component for rendering the task distribution among team members.
 *
 * This component displays a pie chart (using VictoryPie) of task points achieved by each team member.
 * It uses the CustomLabel component to display tooltips for each slice of the pie chart.
 *
 * Props:
 * @param {Object} TaskDistributionData - The data used to render the pie chart.
 *
 * The component renders a header section with a title and description, followed by the content
 * area that displays the VictoryPie chart.
 *
 * @returns {React.ReactElement} A React element representing the team progress chart.
 */
export function TeamProgress(TaskDistributionData) {
  if (TaskDistributionData) {
    return (
      <React.Fragment>
        <Grid container maxHeight="calc((100vh - 64px)/2)" overflow="hidden">
          {/* Grid for entire Header */}
          <Grid
            container
            item
            xs={12}
            style={{
              height: "calc((100vh - 64px)/2 * 0.2)",
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
                  marginTop: "30px",
                }}
              >
                Task Distribution
              </Typography>
            </Grid>
            {/* Grid for intro under Big Header */}
            <Grid item xs={12}>
              <Typography
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
              >
                Taskpoints Achieved by Team Members.
              </Typography>
            </Grid>
          </Grid>
          {/*End of Grid for entire Header */}
          {/* Grid for Pie Chart */}
          <Grid
            item
            xs={12}
            style={{
              height: "calc((100vh - 64px)/2 * 0.8)",
            }}
          >
            <VictoryPie
              style={{ labels: { fill: "white" } }}
              innerRadius={80}
              labelRadius={100}
              labels={({ datum }) => `${datum.y} pts`}
              labelComponent={<CustomLabel />}
              data={TaskDistributionData.TaskDistributionData}
            />
          </Grid>
          {/* End of Grid for Pie Chart */}
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }
}
