import React from "react";
import { Box, Divider, Grid } from "@mui/material";
import UserProfile from "./UserProfile";

export function MainAccount() {
  return (
    <Box style={{ marginLeft: "200px" }}>
      <Grid container>
        <Grid item xs={3} padding={3}></Grid>
        <Grid item xs={6} padding={3} justifyContent="center">
          <UserProfile />
        </Grid>
        <Grid item xs={3} padding={3}></Grid>
      </Grid>
    </Box>
  );
}
