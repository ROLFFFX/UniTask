import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

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
