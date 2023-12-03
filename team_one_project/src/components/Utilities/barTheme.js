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
          backgroundColor: "white", // This will set drawer's bgcolor
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 13,
          color: "#333333", // Set text color to #2E2E2E
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 13,
          fontFamily: "Inter, sans-serif",
          color: "#2E2E2E", // Set text color to #2E2E2E
        },
      },
    },
  },
});

export default barTheme;
