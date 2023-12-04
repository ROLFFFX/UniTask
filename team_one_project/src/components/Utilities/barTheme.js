/**
 * @fileoverview This bartheme defines the theme for nav bars, which are used in Both sidebar and top nav bar
 */

import { createTheme } from "@mui/material/styles";

const barTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "white",
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 13,
          color: "#333333",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
          color: "#2E2E2E",
        },
      },
    },
  },
});

export default barTheme;
