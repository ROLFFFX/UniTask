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
import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BottomSVG } from "./LoginStyling/BottomSVG";
import { TopSVG } from "./LoginStyling/TopSVG";
import theme from "./LoginStyling/theme";
import { useState } from "react";
import { Modal } from "@mui/material";
import { useCookies } from "react-cookie";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function LoginSignup() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const { auth, setAuth } = useAuth();
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const handleClose = () => {
    setShowFailureAlert(false);
    //@todo: jwt-test: delete current user info
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.user) {
      navigate("/login/login_with_group"); //goes to onboarding process after checking if user info is complete.
    }
  }, [auth, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = new FormData(e.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    data = { email: userEmail, password: userPassword };
    // console.log(" This is data: ");
    // console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userJWT = response.data.accessToken;
      setAuth({ user: { userEmail, userPassword, userJWT } });
      setCookie(
        "auth",
        { user: { userEmail, userJWT } },
        { path: "/", maxAge: 1800 }
      );
      // console.log(
      //   "You have been logged in successfully! Here are some of your credentials:"
      // );
      // console.log(data);
      // console.log({ userEmail, userPassword, userJWT });
      // console.log(userJWT);
    } catch (error) {
      if (error) {
        if (!error?.response) {
          alert("No Server Response!");
        } else if (error.response.status === 401) {
          alert("Invalid email and password!");
        } else {
          setShowFailureAlert(true);
        }
        //@todo: implement more custom error messages.
        console.error("Error Caught on Sign In: ", error);
        // setTimeout(() => {
        //   navigate("/login/signup");
        // }, 3000);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TopSVG></TopSVG>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Modal
          open={showFailureAlert}
          onClose={handleClose}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="error-modal-title" variant="h6" component="h2">
              Sign In Error
            </Typography>
            <Typography id="error-modal-description" sx={{ mt: 2 }}>
              Your credentials are correct, but your accout is currently
              disabled. Please check your email inbox and click the link in your
              email.
            </Typography>
            <Button
              onClick={handleClose}
              color="inherit"
              autoFocus
              sx={{ mt: 2, color: "white" }}
            >
              Close
            </Button>
          </Box>
        </Modal>
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
              InputLabelProps={{ style: { fontSize: "14px" } }}
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
              InputLabelProps={{ style: { fontSize: "14px" } }}
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
