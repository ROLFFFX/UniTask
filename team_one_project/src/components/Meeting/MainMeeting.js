import { Box, Grid } from "@mui/material";
import * as React from "react";
import { MeetingContent } from "./MeetingContent";
import { WeeklyCalendar } from "./WeeklyCalendar";

export function MainMeeting() {
  return (
    <Box style={{ marginLeft: "240px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WeeklyCalendar />
        </Grid>
        <Grid item xs={6}>
          <MeetingContent />
        </Grid>
      </Grid>
    </Box>
  );
}