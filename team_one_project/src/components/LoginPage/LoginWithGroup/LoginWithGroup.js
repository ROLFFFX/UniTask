/**
 * @fileoverview This file includes the LoginWithGroup component, used for displaying
 * the login interface with options for creating or joining a workspace. Motsly just
 * layout setup for Workspace management page during login phase.
 */

import { Grid } from "@mui/material";
import React from "react";
import { BottomSVG } from "../LoginStyling/BottomSVG";
import { TopSVG } from "../LoginStyling/TopSVG";
import CreateYourWorkspace from "./CreateYourWorkspace";
import LoginWithWorkspace from "./LoginWithWorkspace";

/**
 * LoginWithGroup - A functional component for rendering the login interface with workspace options.
 *
 * The component uses a Grid layout from MUI to organize the content. Each option (create or join workspace)
 * is presented in its grid item. The SVG components are positioned absolutely to appear as background decorations.
 *
 * @returns {React.ReactElement} A React element representing the login interface with workspace creation and joining options.
 */
export default function LoginWithGroup() {
  return (
    <React.Fragment>
      <TopSVG style={{ position: "absolute", zindex: "-1000" }} />
      <Grid container style={{ position: "relative", zIndex: 1 }}>
        <Grid item xs={6} padding={3}>
          <CreateYourWorkspace />
        </Grid>
        <Grid item xs={6} padding={3}>
          <LoginWithWorkspace />
        </Grid>
      </Grid>

      <BottomSVG style={{ position: "absolute", zindex: "-1000" }} />
    </React.Fragment>
  );
}
