import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Tab,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControl,
  NativeSelect,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import { TopicTabPanelList } from "../components/TopicTabPanelList";
import { FormateDate } from "../../../helpers/utils";
//
export const TopicList = () => {
  const [value, setValue] = React.useState("1");
  const [falcuties, setFalcuties] = React.useState(undefined);
  const [academics, setAcademics] = React.useState(undefined);
  const [selectedFalcuty, setSelectedFalcuty] = React.useState(-1);
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    axios
      .get(apiEndpointLocal + path.falcuty.getall)
      .then((rep) => setFalcuties(rep.data));
    axios
      .get(apiEndpointLocal + path.academic.getall)
      .then((rep) => setAcademics(rep.data));
  }, []);
  console.log(academics);
  return (
    <>
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 71%, rgba(0,212,255,1) 100%)",
          height: "400px",
        }}
      >
        <Box textAlign="center">
          <Typography
            fontWeight={600}
            fontSize={40}
            color="white"
            paddingTop={9}
          >
            Greenwich Idea Management System
          </Typography>
          <Typography variant="h5" fontWeight={500} mt={3} color="white">
            New Idea - New Exploration
          </Typography>
          <TextField
            id="search"
            type="search"
            sx={{
              width: 850,
              border: "none",
              marginTop: 5,
            }}
            placeholder="Find Topics"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" style={{ borderRadius: "50%" }}>
                  {" "}
                  <Avatar
                    alt="Student Name"
                    sx={{ width: 60, height: 60 }}
                    src="https://cdn.universitycompare.com/content/images/UniLogo--University-of-Greenwich-Logo.jpg"
                  />
                </InputAdornment>
              ),
              style: {
                borderRadius: 50,
                backgroundColor: "white",
                height: 60,
              },
            }}
          />
        </Box>
      </div>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <FormControl style={{ width: 250 }}>
          <Typography variant="h8">Academic Year</Typography>
          <NativeSelect
            defaultChecked={1}
            inputProps={{
              name: "age",
              id: "uncontrolled-native",
            }}
            onChange={(event) => setSelectedAcademic(event.target.value)}
          >
            {academics?.map((obj, index) => {
              console.log(obj);
              const startDate = new Date(obj.startDate);
              const startDateFormatted = FormateDate(startDate);
              const endDate = new Date(obj.endDate);
              const endDateFormatted = FormateDate(endDate);
              return (
                <option key={index} value={obj.id}>
                  {startDateFormatted + " - " + endDateFormatted}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <Grid container spacing={0}>
          <Grid xs={9}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginRight: 3,
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Topic" value="1" />
                    <Tab label="Your Submission" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <TopicTabPanelList
                    falcutyId={selectedFalcuty}
                    academicId={selectedAcademic}
                  />
                </TabPanel>
                <TabPanel value="2">Your Submission</TabPanel>
              </TabContext>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Paper
              elevation={2}
              style={{
                margin: "10px 0px",
                padding: "0 25px",
              }}
            >
              <Box>
                <Typography textAlign="center" variant="h6">
                  Falcuty
                </Typography>

                <Box maxWidth role="presentation">
                  <List>
                    {falcuties?.map((obj, index) => (
                      <ListItem
                        key={obj.id}
                        disablePadding
                        style={{ display: "block" }}
                        onClick={() => setSelectedFalcuty(obj.id)}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary={obj.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
