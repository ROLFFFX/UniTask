import Key from "@mui/icons-material/Key";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import * as React from "react";

export function PasswordInput({ onInputChange, onCriteriaMetChange }) {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const minLength = 8;
  const maxLength = 16;

  const handleInputChange = (event) => {
    setValue(event.target.value);
    onInputChange(event); // pass the event to the provided onInputChange handler
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const hasNumber = /\d/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const isLengthValid = value.length >= minLength && value.length <= maxLength;

  const criteriaMet = hasNumber && hasUppercase && isLengthValid;
  React.useEffect(() => {
    // Notify SignUp component about criteria met status change
    onCriteriaMetChange(criteriaMet);
  }, [criteriaMet, onCriteriaMetChange]);

  return (
    <Stack spacing={0.5}>
      <TextField
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: focused ? <Key /> : null,
        }}
        error={!criteriaMet && focused}
      />
      {focused && (
        <>
          <LinearProgress
            variant="determinate"
            size="sm"
            value={Math.min((value.length * 100) / maxLength, 100)}
            sx={{ bgcolor: criteriaMet ? "success.main" : "error.main" }}
          />
          <FormHelperText
            sx={{
              color: criteriaMet ? "success.main" : "error.main",
            }}
          >
            {!hasNumber && "Include at least one numeral."}
            <br />
            {!isLengthValid && "Be 8 to 16 characters in length. "}
            <br />
            {!hasUppercase && "Contain at least one uppercase letter."}
          </FormHelperText>
          <Typography
            variant="body2"
            sx={{
              alignSelf: "flex-end",
              color: criteriaMet ? "success.main" : "error.main",
            }}
          >
            {criteriaMet ? "Criteria Met" : "Criteria Not Met"}
          </Typography>
        </>
      )}
    </Stack>
  );
}
