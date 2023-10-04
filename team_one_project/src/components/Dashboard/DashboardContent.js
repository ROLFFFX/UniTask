import { Divider, Grid } from "@mui/material";
import * as React from "react";
import { BurndownChart } from "./BurndownChart";
import { ProductBacklog } from "./ProductBacklog";
import { TeamProgress } from "./TeamProgress";

export function DashboardContent() {
  return (
    <React.Fragment>
      <Grid container xs={12}>
        {/* For Left Side Bar */}
        <Grid item xs={7} borderRight={0.1} borderColor="#9e9e9e">
          <ProductBacklog />
        </Grid>
        <Grid item xs={5}>
          <Grid container direction="column">
            <Grid item>
              <TeamProgress />
            </Grid>
            <Divider></Divider>
          </Grid>
          <Grid container direction="column">
            <Grid item>
              <BurndownChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
