import { Box, Divider, ThemeProvider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { BottomSVG } from "../LoginStyling/BottomSVG";
import { TopSVG } from "../LoginStyling/TopSVG";
import theme from "../LoginStyling/theme";
import ChooseName from "./Steps/ChooseName";
import ChooseRole from "./Steps/ChooseRole";

export function OB_landing() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [workspaceName, setWorkspaceName] = React.useState(""); // new state for storing the workspace name
  const [role, setRole] = React.useState("");

  const steps = ["Choose Name", "Choose Role"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ChooseName
            workspaceName={workspaceName}
            setWorkspaceName={setWorkspaceName}
          />
        );
      case 1:
        return <ChooseRole role={role} setRole={setRole} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      alert(workspaceName); // console log when 'Next' is clicked on the first step
    }
    if (activeStep === 1) {
      alert(role);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <TopSVG />
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mt: 2, mb: 4 }}>
          <Box
            sx={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "lg",
              padding: "40px",
              backgroundColor: "#F8F9FA",
              borderRadius: "16px",
              boxShadow: "0 3px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography component="h1" variant="h4" align="center">
              Welcome to UniTask
            </Typography>

            <Typography component="h1" variant="subtitle1" align="center">
              Let's create your first workspace now! Workspace is the shared
              environment of your team where you can edit & view the status of
              the project with your teammates.
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        // This styles the icons
                        "&.MuiStepIcon-root": {
                          // base style for the icons
                          color: "#495057", // default (inactive) color
                        },
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <Divider
              sx={{
                my: 1,
                height: "5px",

                width: "100%",
              }}
            ></Divider>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Onboarding Process is complete!
                  </Typography>
                  <Typography variant="subtitle1">
                    Congratulations! You just created your workspace. Let's go
                    to your workspace now!
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row", // ensures the buttons are in one line
                      justifyContent: "flex-end", // aligns the buttons to the right
                      width: "100%", // the box takes the full width
                      mt: 3, // some margin on top for visual spacing
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        variant="contained"
                        onClick={handleBack}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Complete" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Box>
        </Container>
        <BottomSVG />
      </ThemeProvider>
    </React.Fragment>
  );
}
