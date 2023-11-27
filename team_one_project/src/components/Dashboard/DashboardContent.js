import { Divider, Grid } from "@mui/material";
import * as React from "react";
import { BurndownChart } from "./BurndownChart";
import { ProductBacklog } from "./ProductBacklog";
import { TeamProgress } from "./TeamProgress";
import useAuth from "../../hooks/useAuth";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";

export function DashboardContent() {
  /* Hooks Declrations-------------------------------------------------------------------------------------------------------------------- */
  const { auth } = useAuth();
  const [backdropOpen, setBackdropOpen] = React.useState(false); //loading page
  const projectTitle = auth.selectedWorkspace;

  /* End of Hooks Declrations-------------------------------------------------------------------------------------------------------------------- */

  /* Requests Declrations-------------------------------------------------------------------------------------------------------------------- */
  // GET Method to retrieve task distribution among team members.

  // response.data:
  // {
  //   "User 1": number of TaskPoints done,
  //   "User 2": number of TaskPoints done,
  //   ...
  // }
  const fetchTaskDistributionAmongTeamMembers = async () => {
    setBackdropOpen(true); //display loading page

    const url = `${ENDPOINT_URL}dashboard/taskDistribution/${projectTitle}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.user.userJWT}`,
        },
      });
      console.log(response); // @todo: reformat response.
    } catch (error) {
      console.error("Error caught on fetching task distribution: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };

  //GET Method to retrieve Progress Bar information.
  // response.data:
  // {
  //   "To Do": 0,
  //   "Done": 13,
  //   "Doing": 15,
  //   "Not Started": 2
  //   ...
  // }
  const fetchProgressBarData = async () => {
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.get(
        `${ENDPOINT_URL}dashboard/progressBar/${projectTitle}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      console.log(response); // @todo: reformat response.
    } catch (error) {
      console.error("Error caught on fetching progress bar: ", error);
    } finally {
      setBackdropOpen(false);
    }
  };
  /* End of Requests Declrations-------------------------------------------------------------------------------------------------------------------- */

  /* useEffect Declrations-------------------------------------------------------------------------------------------------------------------- */
  React.useEffect(() => {
    // fetchTaskDistributionAmongTeamMembers();
    fetchProgressBarData();
  }, []);
  /* End of useEffect Declrations-------------------------------------------------------------------------------------------------------------------- */

  return (
    <React.Fragment>
      {/* loading state */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
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
