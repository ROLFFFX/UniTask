import * as React from "react";
import { Box, Container, Grid, colors } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Links from "./components/Links";
import MainSideBar from "./components/MainSideBar";
// import LoginSignup from "./components/";
import { Dashboard } from "./components/main_components/Dashboard";
import LoginSignup from "./pages/LoginSignup";
import { BrowserRouter } from "react-router-dom";
import { red } from "@mui/material/colors";

function App() {
  return (
    <div>
      <div>
        <Container maxWidth="xl">
          <Box sx={{ bgcolor: "white", height: "100vh" }}>
            <MainSideBar />
            <LoginSignup />
            <Links />
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default App;
