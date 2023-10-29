import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SHA256 from "crypto-js/sha256";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSVG } from "./LoginStyling/BottomSVG";
import { TopSVG } from "./LoginStyling/TopSVG";
import theme from "./LoginStyling/theme";
import { PasswordInput } from "./PasswordInput";

export function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const allFieldsComplete =
    user.firstName && user.lastName && user.email && user.password;
  const isSignUpEnabled = allFieldsComplete && isPasswordValid;

  const handlePasswordCriteriaMetChange = (criteriaMet) => {
    setIsPasswordValid(criteriaMet);
  };
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // TODO: check user email.
    user.password = SHA256(user.password).toString();
    // console.log(user);
    try {
      await axios.post("http://localhost:8080/user/postUserSignup", user, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error Caught on Sign Up: ", error);
    }
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <TopSVG />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%", // Set width to 100% or another desired value
            maxWidth: "lg", // Or another desired value, or remove maxWidth
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "16px", // Adjust this value for more or less rounded corners
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
          }}
          // border={4}
        >
          <Typography component="h1" variant="h5" sx={{ color: "#343A40" }}>
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onInputChange}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={onInputChange}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onInputChange}
                  InputLabelProps={{ style: { fontSize: 14 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  onInputChange={onInputChange}
                  onCriteriaMetChange={handlePasswordCriteriaMetChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isSignUpEnabled}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <BottomSVG sx={{ margin: 0, padding: 0 }} />
    </ThemeProvider>
  );
}
