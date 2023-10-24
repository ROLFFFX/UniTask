import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F1F2F7",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: {
      color: "50589E",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@import":
            'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap")',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // This targets the root of the MuiButton component
        root: {
          backgroundColor: "#5A67BA", // This sets the background color of the button to red
          "&:hover": {
            backgroundColor: "#50589E", // This sets the hover color of the button to a darker red
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#5A67BA", // This sets the text color of the link to red
        },
      },
    },
  },
});

export default theme;
