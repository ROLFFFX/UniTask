/**
 * @fileoverview This file is the entry point for MainAccount component which serves as the account/profile page.
 * This file mainly defines the outline of utilizing Material-UI's Grid system and renders the UserProfile
 * page inside.
 */
import { Grid } from "@mui/material";
import React from "react";
import UserProfile from "./UserProfile";

/**
 * MainAccount - A functional component that renders the user profile page.
 *
 * This component uses MUI's Grid system to create a layout for the main accounnt page.
 * It includes a UserProfile Component centered in the middle of page. The layout is
 * adjusted to have a left margin of 200px to save space for left side bar.
 *
 * The Grid system is used to divide the page into three columns. The UserProfile component
 * is placed in the middle column, taking up half of the grid's width. The other two columns
 * serve as padding or spacing around the UserProfile component.
 *
 * Note:
 * - This component does not accept any props. The content of profile page is defined in ./UserProfile.js
 *
 * @returns {ReactElement} A React element representing the main account page layout.
 */

export function MainAccount() {
  return (
    <div
      style={{
        marginLeft: "200px",
      }}
    >
      <div>
        <Grid container>
          <Grid item xs={3} padding={3}></Grid>
          <Grid item xs={6} padding={3} justifyContent="center">
            <UserProfile />
          </Grid>
          <Grid item xs={3} padding={3}></Grid>
        </Grid>
      </div>
    </div>
  );
}
