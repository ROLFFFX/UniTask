import { Box, Grid } from "@mui/material";
import * as React from "react";
import { SelectMeetingContent } from "./SelectMeetingContent";

export function SelectMeeting() {
  return (
    <Box
      style={{
        marginLeft: "240px",
        overflowY: "auto", // Adds vertical scrollbar when needed
        maxHeight: "calc(100vh - 100px)", // Adjust the 100px to account for headers/footers
      }}
    >
      <Grid>
        <Grid item xs={12}>
          <SelectMeetingContent></SelectMeetingContent>
        </Grid>
      </Grid>
    </Box>
  );
}
