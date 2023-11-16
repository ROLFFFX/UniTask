import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Grid } from "@mui/material";

export default function CreateYourWorkspace() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login/ob_landing");
  };
  return (
    <div>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
        }}
      >
        <Box style={{ display: "flex", alignItems: "center" }}>
          <AddCircleOutlineIcon style={{ marginRight: 8 }} />
          <Typography sx={{ color: "#343A40", fontSize: 25 }}>
            Create Your Workspace
          </Typography>
        </Box>

        <Divider sx={{ width: "100%", padding: 1 }}></Divider>
        {/* <Typography
          sx={{ color: "#343A40", padding: 1, paddingLeft: 4, paddingRight: 4 }}
        > */}
        {/* <pre />
          We require each user to possess their own workspace to use our app.{" "}
          <pre />
          <br />
          If the list on your right is empty, please proceed to click the button
          below to establish your own workspace. <pre />
          <br />
          If you are currently waiting for your teammates to invite your to
          their workspace, please refresh the page periodically.
          <pre></pre> */}
        {/* </Typography> */}
        <Box>
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 3,
            }}
            justifyContent="left"
          >
            We require each user to possess their own workspace to use our app.
          </Typography>
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 3,
            }}
          >
            If the list on your right is empty, please proceed to click the
            button below to establish your own workspace.
          </Typography>
          <Typography
            sx={{
              color: "#343A40",
              padding: 1,
              paddingLeft: 4,
              paddingRight: 4,
              marginTop: 3,
              marginBottom: 4,
            }}
          >
            If you are currently waiting for your teammates to invite your to
            their workspace, please refresh the page periodically.
          </Typography>
        </Box>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#343A40",
            color: "#E9ECEF",
            fontSize: "11px",
          }}
          onClick={handleNavigate}
        >
          Create Workspace
        </Button>
      </Box>
    </div>
  );
}
