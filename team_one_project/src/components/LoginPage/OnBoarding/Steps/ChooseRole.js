/**
 * @fileoverview This file defines the ChooseRole component, used for allowing
 * users to select a role within a workspace. Second step of On Boarding workspace
 * phase management phase.
 */

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

/**
 * ChooseRole - A functional component for selecting a user role. Second step in OBLanding stepper.
 *
 * This component provides a user interface for choosing a role within a team. It offers two options: 'Team Member' and 'Team Admin'.
 * The 'Team Admin' role is described as having access to modify the status of team members, which has all control over the workspace.
 *
 * Props:
 * @param {string} role - The current value of the selected role.
 * @param {Function} setRole - Function to update the role state in the parent component.
 *
 * @returns {React.ReactElement} A React element representing the role selection interface.
 */
export default function ChooseRole({ role, setRole }) {
  // passed down prop from parent
  const handleInputChange = (event) => {
    setRole(event.target.value);
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
            Choose your role inside this team. (optional)
          </Typography>
          <Typography variant="subtitle1" gutterBottom align="center">
            There are two roles in total: Team Member / Team Admin. Team Admin
            has access to modify status of team members.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* <TextField
            required
            id="role"
            name="role"
            label="Role"
            fullWidth
            autoComplete="off"
            variant="outlined"
            value={role} // controlled component
            onChange={handleInputChange} // handle input change
            InputLabelProps={{ style: { fontSize: 14 } }}
          /> */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Role</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={role}
              label="Role"
              onChange={handleInputChange}
            >
              <MenuItem value={"Team Admin"}>Team Admin</MenuItem>
              <MenuItem value={"Team Member"}>Team Member</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
