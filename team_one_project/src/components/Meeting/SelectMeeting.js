import { Box, Grid } from "@mui/material";
import * as React from "react";
import { SelectMeetingContent } from "./SelectMeetingContent";


export function SelectMeeting() {
  return (
    <Box style={{ marginLeft: "240px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SelectMeetingContent></SelectMeetingContent>
        </Grid>
      </Grid>
    </Box>
  );
}
