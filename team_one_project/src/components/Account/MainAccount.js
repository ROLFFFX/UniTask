import { Grid } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import UserProfile from "./UserProfile";

export function MainAccount() {
  return (
    <div
      style={{
        marginLeft: "200px",
      }}
    >
      <div bgcolor={red}>
        <Grid container>
          <Grid item xs={3} padding={3}></Grid>
          <Grid item xs={6} padding={3} justifyContent="center">
            <UserProfile />
          </Grid>
          <Grid item xs={3} padding={3}></Grid>
        </Grid>
      </div>
    </div>
  );
}
