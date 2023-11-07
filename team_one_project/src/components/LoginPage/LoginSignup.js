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
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import axios from "axios";

export function LoginSignup() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    data = { userEmail, userPassword };
    console.log(" This is data: ");
    console.log(data);
    // @todo: implement login process URL
    try {
      const response = await axios.post("URL For Endpoint", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      //@todo: if success, save access token that is sent from backend
      const userJWT = response.data;
      setAuth({ userEmail, userPassword, userJWT });
      navigate("/login/ob_landing"); //goes to onboarding process without checking if user info is complete.
    } catch (error) {
      if (error) {
        if (!error?.response) {
          alert("No Server Response!");
        }
        //@todo: implement more custom error messages.
        console.error("Error Caught on Sign In: ", error);
      }
    }
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
            backgroundColor: "#F8F9FA",
            borderRadius: "16px", // Adjust this value for more or less rounded corners
            boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
          }}
          // border={4}
        >
          <Typography component="h1" variant="h5" color="#343A40">
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
              <Grid item>
                <Link href="login/signup" variant="body2" color="inherit">
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
