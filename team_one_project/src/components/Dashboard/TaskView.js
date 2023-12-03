/**
 * @fileoverview This file includes the TaskView component, used for displaying
 * a view of tasks (TaskList.js) with options to toggle views and filter tasks by
 * team members. While the TaskList.js is responsible for applying the actual filter,
 * this file handles the 1. toggleView button to toggle 'table task view' and 'data
 * visual view'; 2. filter by username with autocomplete.
 */

import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { Box, Divider, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import "./TaskList.css";

const textFieldStyle = {
  "& .MuiInputBase-input": {
    fontFamily: "Inter, sans-serif",
    fontSize: "12px",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Inter, sans-serif",
    fontSize: "12px",
  },
  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    color: "black",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "black",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "black",
  },
};

/**
 * TaskView - A functional component for rendering a view of tasks with filter by username functionality.
 *
 * This component provides an interface for viewing tasks. It includes a dropdown menu for toggling
 * between different views (Data Visualization, Table Task View) and an autocomplete field
 * for filtering tasks by team members. The actual table is rendered through TaskList, which can be found
 * in ./Tasklist.js
 *
 * Props:
 * @param {Object} props - The props passed to the TaskView component.
 * @param {Array} props.formattedTeamMembers - The formatted list of team members for the task filter.
 * @param {string} props.toggleView - The current view mode.
 * @param {Function} props.onToggleViewChange - Callback function to handle view mode changes.
 *
 * State:
 * @state @type {Object|null} value - The currently selected value for the team member filter.
 * @state @type {string} inputValue - The input value for the autocomplete field.
 * @state @type {Array} filteredMembers - The filtered list of team members based on the selected value.
 * @state @type {boolean} open - State to control the dropdown menu's open status.
 *
 * @returns {React.ReactElement} A React element representing the task view component.
 */
export default function TaskView(props) {
  const MembersList = props.formattedTeamMembers;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(
    props.formattedTeamMembers
  );
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = React.useCallback((event, isOpen) => {
    setOpen(isOpen);
  }, []);

  useEffect(() => {
    if (value) {
      setFilteredMembers(
        props.formattedTeamMembers.filter((member) => member !== value)
      );
    } else {
      setFilteredMembers(props.formattedTeamMembers); // Reset if no value is selected
    }
  }, [value, props.formattedTeamMembers]);

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
            <Divider
              orientation="vertical"
              flexItem
              style={{
                position: "absolute",
                right: 0,
                top: "15%",
                height: "70%",
                zIndex: 1, // adjust z-index as needed
              }}
            />
          </Grid>
          {/* Grid for all other filter fields */}
          <Grid
            item
            xs={7}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  // console.log(newValue); // Log the selected item
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={props.formattedTeamMembers}
                sx={{
                  width: 200,
                }}
                color="black"
                ListboxProps={{
                  sx: {
                    "& .MuiAutocomplete-option": {
                      fontFamily: "Inter, sans-serif", // Replace with your desired font family
                      fontSize: "13px", // Replace with your desired font size
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search By Teammate"
                    variant="standard"
                    sx={textFieldStyle}
                  />
                )}
              />
            </Box>
          </Grid>

          {/* End of all other filter fields */}
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
          <TaskList props={{ ...props, formattedTeamMembers: value }} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
