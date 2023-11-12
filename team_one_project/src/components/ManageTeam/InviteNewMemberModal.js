import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  ThemeProvider,
  Button,
} from "@mui/material";
import theme from "../LoginPage/LoginStyling/theme";

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

export default function InviteNewMemberModal({ open, handleClose }) {
  const [email, setEmail] = React.useState("");
  const handleSubmit = () => {
    console.log("Email Submitted: ", email);
  };
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
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
            >
              Invite New Team Member
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
      </ThemeProvider>
    </React.Fragment>
  );
}
