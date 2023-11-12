import React from "react";
import { Box } from "@mui/material";
import ManageTeamContent from "./ManageTeamContent";

export function ManageTeam() {
  return (
    <React.Fragment>
      <Box sx={{ marginLeft: "200px" }}>
        <ManageTeamContent></ManageTeamContent>
      </Box>
    </React.Fragment>
  );
}
