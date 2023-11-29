import { Typography, Grid, Divider, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import "./TaskList.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import VisualCharts from "./VisualCharts";

export default function DataVisualization(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback((event, isOpen) => {
    setOpen(isOpen);
  }, []);
  return (
    <React.Fragment>
      {/* Grid for entire Data Visualization Section */}
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
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            position="relative"
          >
            <Dropdown open={open} onOpenChange={handleOpenChange}>
              <MenuButton
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderColor: "#6C757D",
                }}
              >
                {props.toggleView}
              </MenuButton>
              <Menu>
                <MenuItem
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                  }}
                  onClick={() => props.onToggleViewChange("Table Task View")}
                >
                  Table Task View
                </MenuItem>
                <MenuItem
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                  }}
                  onClick={() => props.onToggleViewChange("Dashboard")}
                >
                  Data Visualization
                </MenuItem>
              </Menu>
            </Dropdown>
          </Grid>
        </Grid>
        {/* Grid for actual content */}
        <Grid
          item
          height="calc((100vh - 64px) * 0.9)" // 90% of page height excluding top nav bar
          maxHeight="calc((100vh - 64px) * 0.9)"
          overflow="hidden"
        >
          <Divider />
          <VisualCharts
            workspaceCreationTime={props.workspaceCreationTime}
            taskData={props.taskData}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
