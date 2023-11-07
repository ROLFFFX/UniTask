import React from "react";
import { Box, Divider, Grid } from "@mui/material";
import UserProfile from "./UserProfile";

export function MainAccount() {
  return (
    <Box style={{ marginLeft: "200px" }}>
      <Grid container>
        <Grid item xs={6} padding={3}>
          <UserProfile />
        </Grid>
        <Grid item xs={6} padding={3}>
          <h2>test</h2>
        </Grid>
      </Grid>
    </Box>
  );
}
