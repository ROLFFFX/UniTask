import { Grid, LinearProgress, Typography, Tooltip } from "@mui/material";
import React from "react";

export default function HorizontalBarChart({ progressData }) {
  const total =
    progressData.progressBarData["To Do"] +
    progressData.progressBarData["Not Started"] +
    progressData.progressBarData["Doing"] +
    progressData.progressBarData["Done"];
  const todo =
    progressData.progressBarData["To Do"] +
    progressData.progressBarData["Not Started"];
  const doing = progressData.progressBarData["Doing"];
  const done = progressData.progressBarData["Done"];

  return (
    <React.Fragment>
      <Grid container alignItems="center" justifyContent="center">
        {/* To Do  */}
        <Tooltip
          title={
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
            >
              {`Tasks worth of ${todo} task points are done out of ${total} taskpoints.`}
            </Typography>
          }
          arrow
          placement="top"
          TransitionProps={{ timeout: 600 }}
        >
          <Grid
            container
            item
            xs={12}
            height="calc((100vh - 64px) * 0.2 * 0.8 / 3)"
            alignItems="center"
          >
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                }}
              >
                To Do: {((todo / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(todo / total) * 100}
              />
            </Grid>
          </Grid>
        </Tooltip>
        {/* Doing  */}
        <Tooltip
          title={
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
            >
              {`Tasks worth of ${doing} task points are done out of ${total} taskpoints.`}
            </Typography>
          }
          arrow
          placement="top"
          TransitionProps={{ timeout: 600 }}
        >
          <Grid
            container
            item
            xs={12}
            height="calc((100vh - 64px) * 0.2 * 0.8 / 3)"
            alignItems="center"
          >
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                }}
              >
                Doing: {((doing / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(doing / total) * 100}
              />
            </Grid>
          </Grid>
        </Tooltip>
        {/* Done */}
        <Tooltip
          title={
            <Typography
              style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}
            >
              {`Tasks worth of ${done} task points are done out of ${total} taskpoints.`}
            </Typography>
          }
          arrow
          placement="top"
          TransitionProps={{ timeout: 600 }}
        >
          <Grid
            container
            item
            xs={12}
            height="calc((100vh - 64px) * 0.2 * 0.8 / 3)"
            alignItems="center"
          >
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                }}
              >
                Done: {((done / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(done / total) * 100}
              />
            </Grid>
          </Grid>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
}
