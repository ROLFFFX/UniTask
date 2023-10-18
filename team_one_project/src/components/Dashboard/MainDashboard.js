import { Grid, Box } from "@mui/material";
import * as React from "react";
import PermanentDrawer from "../Utilities/PermanentDrawer";
import { TopAppBar } from "../Utilities/TopNavBar";
import { DashboardContent } from "./DashboardContent";

export function MainDashboard() {
  return (
    <Box style={{ marginLeft: "240px" }}>
      <DashboardContent />
    </Box>
  );
}
