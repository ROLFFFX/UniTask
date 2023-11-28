import { Typography, Grid, Divider } from "@mui/material";
import React from "react";
import TaskList from "./TaskList";
import "./TaskList.css";

export default function TaskView(props) {
  return (
    <React.Fragment>
      {/* Grid for entire TaskBacklog Section */}
      <Grid container alignItems="center" justifyContent="center">
        {/* Grid for header section. Including Text Header and toggled buttons */}
        <Grid
          container
          item
          height="calc((100vh - 64px) * 0.1)" // 10% of page height excluding top nav bar
          maxHeight="calc((100vh - 64px) * 0.1)"
          overflow="hidden"
        >
          {/* Grid for text header */}
          <Grid item xs={3}>
            <Typography
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Task View
            </Typography>
          </Grid>
          {/* Grid for toggled buttons */}
          <Grid item xs={9}></Grid>
        </Grid>
        {/* Grid for actual content */}
        <Grid
          item
          height="calc((100vh - 64px) * 0.9)" // 90% of page height excluding top nav bar
          maxHeight="calc((100vh - 64px) * 0.9)"
          overflow="hidden"
          className="custom-scrollbar"
        >
          <Divider />
          <TaskList props={props} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
