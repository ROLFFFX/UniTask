import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import theme from "./LoginStyling/theme";
import { TopSVG } from "./LoginStyling/TopSVG";
import { BottomSVG } from "./LoginStyling/BottomSVG";

export function LoginSignup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <TopSVG></TopSVG>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%", // Set width to 100% or another desired value
            maxWidth: "lg", // Or another desired value, or remove maxWidth
            padding: "40px",
            backgroundColor: "#F6F7FC",
            borderRadius: "16px", // Adjust this value for more or less rounded corners
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
          }}
          // border={4}
        >
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { fontSize: 14 } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button> */}
                {/* <Link href="login/forgotpassword" variant="body2">
                  {"Forgot password?"}
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="login/signup" variant="body2">
                  {"Don't have an account? Sign Up!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <BottomSVG></BottomSVG>
    </ThemeProvider>
  );
}
