import {
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import useAuth from "../../hooks/useAuth";
import theme from "../LoginPage/LoginStyling/theme";
import { ENDPOINT_URL } from "../../hooks/useConfig";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function InviteNewMemberModal({
  open,
  handleClose,
  onInviteSuccess,
}) {
  const { auth } = useAuth();
  const [email, setEmail] = React.useState("");
  const [errorModalOpen, setErrorModalOpen] = React.useState(false); //handle user invite error
  const [backdropOpen, setBackdropOpen] = React.useState(false); //loading page

  const handleSubmit = async () => {
    //email is already set up in text field
    const projectTitle = auth.selectedWorkspace;
    setBackdropOpen(true); //display loading page
    try {
      const response = await axios.post(
        `${ENDPOINT_URL}projects/addUserToWorkspace/${email}/${projectTitle}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth.user.userJWT}`,
          },
        }
      );
      if (response.status === 201) {
        console.log("User Added Successfully.");
        handleClose();
        onInviteSuccess();
      }
      console.log(response);
    } catch (error) {
      console.error("Error adding user to project: ", error);
      setErrorModalOpen(true);
    } finally {
      setBackdropOpen(false);
    }
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              Invite New Team Member
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontFamily: "Inter, sans-serif" }}
            >
              Please enter the email of team member you want to invite in the
              textfield below. Make sure team member already registered using
              this email.
            </Typography>
            <TextField
              sx={{ marginTop: 5 }}
              required
              id="outlined-required"
              label="Enter Email"
              InputLabelProps={{ style: { fontSize: "14px" } }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ marginTop: 5, fontSize: "12px" }}
              fullWidth
              onClick={handleSubmit}
            >
              Invite User with this Email
            </Button>
          </Box>
        </Modal>

        {/* Error Modal */}
        <Modal
          open={errorModalOpen}
          onClose={() => setErrorModalOpen(false)}
          aria-labelledby="error-modal-title"
          aria-describedby="error-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography
              id="error-modal-title"
              variant="h6"
              component="h2"
              textAlign="center"
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              Invite User Error
            </Typography>
            <Typography
              id="error-modal-description"
              sx={{ mt: 2, fontFamily: "Inter, sans-serif" }}
            >
              An error occurred while inviting the user. Please make sure that
              the member you are inviting has registered with this email.
            </Typography>
            <Button
              variant="contained"
              sx={{ marginTop: 5, fontSize: "12px" }}
              fullWidth
              onClick={() => setErrorModalOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </React.Fragment>
  );
}
