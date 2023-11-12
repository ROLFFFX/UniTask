import React from "react";
import { Box } from "@mui/material";

export default function ManageTeamContent() {
  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          //   alignItems: "center",
          maxWidth: "lg", // Or another desired value, or remove maxWidth
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "16px", // Adjust this value for more or less rounded corners
          boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)", // Adjust values and color for desired shadow effect
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
      </Box>
    </React.Fragment>
  );
}
