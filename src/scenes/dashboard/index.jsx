import { tokens } from "theme";
import React, { useState } from "react";
import { CheckCircle, HighlightOff } from "@mui/icons-material";
import {
  Box,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    "Welcome",
    "Data Entry",
    "Risk Assessment",
    "Network Review",
    "Policy Review",
    "Training",
    "Initial Score",
  ];

  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  function getStepContent(step) {
    let result = "";
    switch (step) {
      case 0: // Welcome
        return (
          <Box>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      case 1: // Data Entry
        return (
          <Box>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      case 2: // Risk Assessment
        return (
          <Box>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      case 3: // Network Review
        return (
          <Box>
            <Typography variant="body1">
              During this step, your network infrastructure will be analyzed for
              risks and vulnerabilities. This will include a review of your
              network topology, and a configuration review of your firewall and
              other network devices. An internal vulnerability scan will then be
              performed to identify any potential risks from within your
              network. Finally an external penetration test will be performed to
              identify any potential risks from outside your network.
            </Typography>
            <Box m="10px">
              <Box>
                <CheckCircle sx={{ color: colors.greenAccent[500] }} />
                <Typography> Network Topology Review</Typography>
              </Box>
              <Box>
                <HighlightOff sx={{ color: colors.redAccent[500] }} />
                <Typography>Configuration Review </Typography>
              </Box>
              <Box>
                <HighlightOff sx={{ color: colors.redAccent[500] }} />
                <Typography>Vulnerability Scan</Typography>
              </Box>
              <Box>
                <HighlightOff sx={{ color: colors.redAccent[500] }} />
                <Typography>Penetration Test</Typography>
              </Box>
            </Box>
          </Box>
        );
      case 4: // Policy Review
        return (
          <Box>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      case 5: // Training
        return (
          <Box>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      case 6: // Initial Score
        return (
          <Box>
            <Typography variant="h5">Initial Score</Typography>
            <Typography variant="body1">
              This is a step-by-step guide to help you get started with your
              KnowByte account.
            </Typography>
          </Box>
        );
      default:
        return "Unknown step";
    }
  }

  return (
    <Box m="50px" width="55vw">
      <Typography variant="h4">Your Setup Journey</Typography>
      <Stepper
        sx={{ m: 4 }}
        variant="outlined"
        orientation="vertical"
        activeStep={activeStep}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const buttonProps = {};
          return (
            <Step {...stepProps} key={label}>
              <StepButton
                {...buttonProps}
                sx={{
                  "& .Mui-completed": { color: colors.greenAccent[500] },
                  "& .Mui-active": { color: colors.blueAccent[500] },
                }}
                onClick={handleStep(index)}
              >
                {label}
              </StepButton>
              <StepContent>
                {" "}
                <Box sx={{ m: 4 }}>{getStepContent(activeStep)}</Box>{" "}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default Dashboard;
