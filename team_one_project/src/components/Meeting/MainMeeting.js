import { Box, Grid } from "@mui/material";
import * as React from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";

export function MainMeeting() {
  return (
    <Box style={{ marginLeft: "200px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {" "}
          {/* Changed the size to take full width */}
          <WeeklyCalendar />
        </Grid>
      </Grid>
    </Box>
  );
}
