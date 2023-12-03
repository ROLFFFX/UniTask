/**
 * @fileoverview This file includes the CreateYourWorkspace component, used for
 * guiding users to create or join a workspace during Login phase.
 */

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * CreateYourWorkspace - A functional component for rendering a Card that prompts users to create or join a workspace.
 *
 * This component displays instructions and a button for users to create their own workspace. It is designed to guide new
 * users who do not have an existing workspace or are awaiting an invitation to join one.
 *
 * Also, it uses React Router's useNavigate hook for handling navigation to the workspace creation page.
 *
 * @returns {React.ReactElement} A React element representing the Box for creating or joining a workspace.
 */
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
          <Typography
            sx={{ color: "#343A40", fontSize: 25 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
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
            style={{ fontFamily: "Inter, sans-serif" }}
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
            style={{ fontFamily: "Inter, sans-serif" }}
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
            style={{ fontFamily: "Inter, sans-serif" }}
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
