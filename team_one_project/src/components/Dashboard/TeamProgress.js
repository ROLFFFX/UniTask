import {
  Box,
  Backdrop,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import React from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";

const sampleData_2 = [
  { x: "Sichen Liu", y: 3 },
  { x: "User Ghost", y: 2 },
  { x: "Yuxuan Shi", y: 8 },
];

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
                Taskpoints Achieved by Team members.
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
