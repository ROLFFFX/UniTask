import { Grid } from "@mui/material";
import React from "react";
import { BottomSVG } from "../LoginStyling/BottomSVG";
import { TopSVG } from "../LoginStyling/TopSVG";
import CreateYourWorkspace from "./CreateYourWorkspace";
import LoginWithWorkspace from "./LoginWithWorkspace";

export default function LoginWithGroup() {
  return (
    <React.Fragment>
      <TopSVG />
      <Grid container>
        <Grid item xs={6} padding={3}>
          <CreateYourWorkspace />
        </Grid>
        <Grid item xs={6} padding={3}>
          <LoginWithWorkspace />
        </Grid>
      </Grid>

      <BottomSVG />
    </React.Fragment>
  );
}
