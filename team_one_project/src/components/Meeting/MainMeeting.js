import { Box, Grid } from "@mui/material";
import * as React from "react";
import { WeeklyCalendar } from "./WeeklyCalendar";

export function MainMeeting() {
  return (
    <Box
      style={{
        marginLeft: "200px",
        overflowY: "auto", // Adds vertical scrollbar when needed
        maxHeight: "calc(100vh - 100px)", // Adjust the 100px to account for headers/footers
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Changed the size to take full width */}
          <WeeklyCalendar />
        </Grid>
      </Grid>
    </Box>
  );
}
