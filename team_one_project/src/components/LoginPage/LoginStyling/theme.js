import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F1F2F7",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Specify the Inter font here
    h5: {
      color: "#50589E",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "@import":
            'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap")', // Import the Inter font from Google Fonts
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#5A67BA", // This sets the color of the helper text to #5A67BA
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5A67BA", // Color when hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5A67BA", // Color when focused
          },
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
