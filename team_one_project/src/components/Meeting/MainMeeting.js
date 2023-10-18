import { Grid, Box } from "@mui/material";
import * as React from "react";
import PermanentDrawer from "../Utilities/PermanentDrawer";
import { TopAppBar } from "../Utilities/TopNavBar";
import { MeetingContent } from "./MeetingContent";

export function MainMeeting() {
  return (
    <Box style={{ marginLeft: "240px" }}>
      <MeetingContent />
    </Box>
  );
}
