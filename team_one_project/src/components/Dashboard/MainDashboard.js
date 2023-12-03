/**
 * @fileoverview This file includes the MainDashboard component, which serves as
 * the entry point for the dashboard./
 */

import { Box } from "@mui/material";
import * as React from "react";
import { DashboardContent } from "./DashboardContent";

export function MainDashboard() {
  return (
    <Box style={{ marginLeft: "200px" }}>
      <DashboardContent />
    </Box>
  );
}
