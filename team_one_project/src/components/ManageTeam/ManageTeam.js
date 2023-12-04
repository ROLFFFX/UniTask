/**
 * @fileoverview This file includes the ManageTeam component, which is responsible for
 * rendering the interface for managing team settings within a larger application.
 * Similar to LoginWithGroup in LoginPage, it is used for styling to correctly position
 * the ManageTeamContent to avoid overlapping between nav bars and the actaul content.
 */

import React from "react";
import { Box } from "@mui/material";
import ManageTeamContent from "./ManageTeamContent";
import { Grid } from "@mui/material";

/**
 * ManageTeam - A functional component for fine tuning layout of ManageTeamContent. ManageTeamContent can be found in
 * ./ManageTeamContent.js
 *
 * Layout:
 * - The outer Box component provides a left margin, suggesting integration within a larger layout, possibly a dashboard.
 * - The Grid container divides the space into three columns, with the central column housing the ManageTeamContent.
 *   The empty Grid with xs={2} are paddings.
 *
 * @returns {React.ReactElement} A React element representing the team management interface.
 */
export function ManageTeam() {
  return (
    <React.Fragment>
      <Box sx={{ marginLeft: "200px" }}>
        <Grid container>
          <Grid item xs={2} padding={3}></Grid>
          <Grid item xs={8} padding={3} justifyContent="center">
            <ManageTeamContent></ManageTeamContent>
          </Grid>
          <Grid item xs={2} padding={3}></Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
