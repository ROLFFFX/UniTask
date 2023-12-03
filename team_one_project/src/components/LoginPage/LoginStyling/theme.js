/**
 * @fileoverview This file defines a custom theme for MUI components, customizing
 * the color palette, typography, and specific component styles to create custom
 * user interface. It is frequently used for all login / signup cycles.
 */

import { createTheme } from "@mui/material/styles";

/**
 * theme - A custom theme configuration for MUI components.
 *
 *
 * Configuration includes:
 * - A default background color (#E9ECEF).
 * - A global font family ('Inter', sans-serif). Its corresponding config can be found in the
 *   header section of index.js
 * - Specific color and style customizations for TextField, FormHelperText, OutlinedInput,
 *   Typography, Button, Link, and InputLabel components. This is the unitary styling we use
 *   for all Textfields in login/signup cycle.
 *
 *
 * @returns {Object} A Material-UI theme object with customized settings.
 */
const theme = createTheme({
  palette: {
    background: {
      default: "#E9ECEF",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif", // Specify the Inter font here
    h5: {
      color: "#50589E",
    },
  },

  components: {
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
          color: "#343A40", // This sets the color of the helper text to #5A67BA
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#343A40", // Color when hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#343A40", // Color when focused
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
          backgroundColor: "#343A40", // This sets the background color of the button to red
          "&:hover": {
            backgroundColor: "#6C757D", // This sets the hover color of the button to a darker red
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#343A40",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // ... your existing styles for 'root' if any
          "&.Mui-focused": {
            // targeting the focused state of the label
            color: "#343A40", // change this color to your preferred 'red' hex code or other color
          },
        },
      },
    },
  },
});

export default theme;
