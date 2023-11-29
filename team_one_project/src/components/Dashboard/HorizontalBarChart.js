import { Grid, Typography, Tooltip } from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import React, { useState } from "react";

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
  const [hoverTODO, setHoverTODO] = useState(true); // needs 3 hover state
  const [hoverDOING, setHoverDOING] = useState(true);
  const [hoverDONE, setHoverDONE] = useState(true);

  return (
    <React.Fragment>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        height="calc((100vh - 64px)/2 * 0.85)"
      >
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
            onMouseEnter={() => setHoverTODO(false)}
            onMouseLeave={() => setHoverTODO(true)}
          >
            <Grid
              item
              xs={3}
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
                  fontWeight: "bold",
                }}
              >
                To Do: {((todo / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                color="neutral"
                determinate={hoverTODO}
                value={(todo / total) * 100}
                sx={{ "--LinearProgress-thickness": "10px" }}
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
            onMouseEnter={() => setHoverDOING(false)}
            onMouseLeave={() => setHoverDOING(true)}
          >
            <Grid
              item
              xs={3}
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
                  fontWeight: "bold",
                }}
              >
                Doing: {((doing / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                color="neutral"
                determinate={hoverDOING}
                value={(doing / total) * 100}
                sx={{ "--LinearProgress-thickness": "10px" }}
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
            onMouseEnter={() => setHoverDONE(false)}
            onMouseLeave={() => setHoverDONE(true)}
          >
            <Grid
              item
              xs={3}
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
                  fontWeight: "bold",
                }}
              >
                Done: {((done / total) * 100).toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <LinearProgress
                color="neutral"
                determinate={hoverDONE}
                value={(done / total) * 100}
                sx={{ "--LinearProgress-thickness": "8px" }}
              />
            </Grid>
          </Grid>
        </Tooltip>
      </Grid>
    </React.Fragment>
  );
}
