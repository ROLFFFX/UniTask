import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
