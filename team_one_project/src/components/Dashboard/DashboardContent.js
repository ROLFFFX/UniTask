import { Grid } from "@mui/material";
import * as React from "react";
import { BurndownChart } from "./BurndownChart";
import { ProductBacklog } from "./ProductBacklog";
import { TeamProgress } from "./TeamProgress";

export function DashboardContent() {
  return (
    <React.Fragment>
      <Grid container xs={12}>
        {/* For Left Side Bar */}
        <Grid item xs={7} spacing={3}>
          <ProductBacklog />
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Grid container direction="column">
            <Grid item overflow="scroll">
              <TeamProgress />
            </Grid>
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
