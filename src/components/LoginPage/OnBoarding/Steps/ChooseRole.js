import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
