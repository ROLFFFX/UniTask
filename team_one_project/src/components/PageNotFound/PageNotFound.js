/**
 * @fileoverview This file includes the PageNotFound component, a functional component that
 * displays a 404 error message and redirects users to the homepage after countdown. However,
 * in the deployed version, Page Not Found is internally handled by vercel.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

/**
 * PageNotFound - A functional component for handling 404 page not found errors.
 *
 *
 * State:
 * @state @type {number} countdown - A countdown timer that decrements every second.
 *
 * @returns {React.ReactElement} A React element representing the 404 error page with a redirect countdown.
 */
export function PageNotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <React.Fragment>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>404... Redirecting in {countdown} seconds</h2>
      </Container>
    </React.Fragment>
  );
}
