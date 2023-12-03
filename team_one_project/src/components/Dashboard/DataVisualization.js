/**
 * @fileoverview This file includes the DataVisualization component on the left,
 * which is used for rendering visual representations of data in a project management application.
 * It has Group Progression on top and Personal Progression at bottom. This function is solely
 * used to handle layout and conditional rendering. It does not process data further.
 */

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import "./TaskList.css";
import VisualCharts from "./VisualCharts";

/**
 * DataVisualization - A functional component for rendering data visualizations.
 *
 * This component displays visual charts and provides an interactive dropdown
 * menu to toggle between different views of task data. It is designed to offer
 * an insightful and interactive representation of tasks in a project management
 * setting. Group Progression on top, Personal Progression at bottom.
 *
 * Props:
 * @param {Object} props - The props passed to the component.
 * @param {string} props.toggleView - Current view mode for the data visualization. Table Task View / Data Visual View
 * @param {Function} props.onToggleViewChange - Callback function to handle view mode change. Synchronize state with parent component.
 * @param {string} props.workspaceCreationTime - The creation time of the workspace.
 * @param {Array} props.taskData - Data of the tasks to be visualized. Contains data regarding tasks.
 *
 * State:
 * @state @type {boolean} open - Controls the visibility of the dropdown menu.
 *
 * The component consists of two main sections:
 * 1. Header with a dropdown menu for view mode selection.
 * 2. Content area displaying visual charts of the task data.
 *
 * @returns {React.ReactElement} A React element representing the data visualization component.
 */
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
              {/* Button for drop down menu. Content of button is current toggled mode. */}
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
              {/* Drop Down menu opened for button */}
              <Menu>
                <MenuItem
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                  }}
                  onClick={() => props.onToggleViewChange("Data Visual View")}
                >
                  Data Visualization
                </MenuItem>
                <MenuItem
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                  }}
                  onClick={() => props.onToggleViewChange("Table Task View")}
                >
                  Table Task View
                </MenuItem>
              </Menu>
            </Dropdown>
          </Grid>
          <Grid
            item
            xs={9}
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                borderColor: "#6C757D",
              }}
            >
              Click "Data Visual View" to Change View Mode.
            </Typography>
          </Grid>
        </Grid>
        {/* Grid for actual content */}
        <Grid
          item
          height="calc((100vh - 64px) * 0.9)"
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
