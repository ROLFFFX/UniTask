import React from "react";
import { Box } from "@mui/material";
import ManageTeamContent from "./ManageTeamContent";
import { Grid } from "@mui/material";

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
