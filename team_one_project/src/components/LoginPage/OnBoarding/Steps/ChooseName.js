/**
 * @fileoverview This file defines the ChooseName component, used for allowing
 * users to choose a name for their workspace during the workspace creation phase.
 */

import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

/**
 * ChooseName - A functional component for inputting a workspace name.
 *
 * This component presents a user interface for entering the name of a new workspace. It consists of a text field
 * where users can type the workspace name. Workspace name is then passed up to the parent component for better
 * state management and final POST request..
 *
 * Props:
 * @param {string} workspaceName - The current value of the workspace name.
 * @param {Function} setWorkspaceName - Function to update the workspace name state in the parent component.
 *
 *
 * @returns {React.ReactElement} A React element representing the workspace name input interface.
 */
function ChooseName({ workspaceName, setWorkspaceName }) {
  // passed down prop from parent
  const handleInputChange = (event) => {
    // check if workspace name is valid
    setWorkspaceName(event.target.value);
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom align="center">
            Choose a name for your team. (*required)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="workspacename"
            name="workspacename"
            label="Workspace Name"
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={workspaceName}
            onChange={handleInputChange}
            InputLabelProps={{ style: { fontSize: 14 } }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ChooseName;
