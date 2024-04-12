import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const steps = ["Submit contribution", "Edit contribution", "closure date"];

export const Process = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const [topic, setTopic] = React.useState();
  const [topics, setTopics] = React.useState([]);

  const [contributions, setContributions] = React.useState([]);

  React.useEffect(() => {
    setContributions([
      { id: 1, name: "Redux save my life" },
      { id: 2, name: "Redux maxx ping" },
      { id: 3, name: "how to install redux" },
      { id: 4, name: "Make redux faster" },
      { id: 5, name: "How to uninstall redux" },
    ]);
  }, []);

  React.useEffect(() => {
    setTopics([
      { id: 1, name: "redux" },
      { id: 2, name: "html,css and more" },
    ]);
  }, []);

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

  return (
    <>
      <Container>
        <Box sx={{ margin: "3rem 0rem", width: "90%" }} align="center">
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
        <Box sx={{ margin: "3rem 0rem", width: "100%" }} align="left">
          <FormControl maxWidth="20%">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Topic
            </InputLabel>
            <NativeSelect defaultValue={1}>
              {/* <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option> */}
              {topics.map((topic) => (
                <option value={topic.id}>{topic.name}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{ margin: "3rem 0rem 0rem 0rem", width: "90%" }} align="left">
          {/* <Paper elevation={4}> */}
          <List>
            {contributions.map((contribution) => (
              <ListItem
                key={contribution.id}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginBottom: "8px",
                }}
              >
                <Avatar
                  alt={contribution.name}
                  // src={faculty.image}
                  sx={{
                    marginRight: 2,
                    // width: theme.spacing(7),
                    // height: theme.spacing(7),
                    // marginRight: theme.spacing(2),
                  }}
                />
                <ListItemText
                  primary={contribution.name}
                  // secondary={contribution.status ? "Active" : "Disable"}
                />
                <ListItemSecondaryAction></ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {/* </Paper> */}
        </Box>
        <Box sx={{ margin: "1rem 0rem 3rem 0rem", width: "90%" }} align="center">
          <Stack spacing={2} align="center">
            <Pagination count={5} variant="outlined" color="primary" />
          </Stack>
        </Box>
      </Container>
    </>
  );
};
