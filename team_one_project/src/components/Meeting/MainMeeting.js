import { Grid } from "@mui/material";
import * as React from "react";
import PermanentDrawer from "../Utilities/PermanentDrawer";
import { MeetingContent } from "./MeetingContent";

export function MainMeeting() {
  return (
    <Grid container direction="column" style={{ height: "100vh" }}>
      {/* <Grid item>
        <TopAppBar />
      </Grid> */}
      <Grid item container>
        <Grid item xs={2} style={{ overflow: "auto" }}>
          <PermanentDrawer />
        </Grid>
        <Grid item xs={10} style={{ overflow: "auto" }}>
          <MeetingContent />
        </Grid>
      </Grid>
    </Grid>
  );
}
