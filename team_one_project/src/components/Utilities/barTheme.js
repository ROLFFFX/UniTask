import { createTheme } from "@mui/material/styles";

const barTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@import":
            'url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap")',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 13,
          color: "#333333", // Set text color to #2E2E2E
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 13,
          color: "#2E2E2E", // Set text color to #2E2E2E
        },
      },
    },
  },
});

export default barTheme;
