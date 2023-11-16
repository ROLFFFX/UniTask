import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Modal } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSVG } from "./LoginStyling/BottomSVG";
import { TopSVG } from "./LoginStyling/TopSVG";
import theme from "./LoginStyling/theme";
import { PasswordInput } from "./PasswordInput";
import { Alert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ENDPOINT_URL } from "../../hooks/useConfig";

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

export function SignUp() {
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const handleClose = () => {
    setShowFailureAlert(false);
  };
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

    const modifyUser = {
      username: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: user.password,
      role: [],
    };
    console.log(modifyUser);
    try {
      const response = await axios.post(
        `${ENDPOINT_URL}api/auth/signup`,
        modifyUser,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setShowSuccessAlert(true);
      // console.log(JSON.stringify(response));   NOTE: response.data contains the JWT token.
      // success alert on succesfully registered
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      if (!error?.response) {
        alert("No Server Response!");
      } else {
        setShowFailureAlert(true);
      }
      //@todo: implement more custom error messages.
      console.error("Error Caught on Sign Up: ", error);
    }
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
            <Modal
              open={showFailureAlert}
              onClose={handleClose}
              aria-labelledby="error-modal-title"
              aria-describedby="error-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="error-modal-title" variant="h6" component="h2">
                  Sign Up Error
                </Typography>
                <Typography id="error-modal-description" sx={{ mt: 2 }}>
                  We encountered an error while processing your sign-up request.
                  <pre></pre>
                  Possible Causes:
                  <br></br>
                  1. There is a typo in your email.
                  <br></br>
                  2. This email is taken.
                  <br></br>
                  3. This Firstname and Lastname is taken.
                  <br></br>
                  4. This email is registered, but currently disabled. Please
                  sign up again and check your email inbox and spam inbox.
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
            {showSuccessAlert && (
              <Alert
                severity="success"
                iconMapping={{
                  success: <CheckCircleOutlineIcon fontSize="inherit" />,
                }}
              >
                Registration successful! Please check your email...
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" color="inherit">
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
