import axios from "axios";
import React from "react";
import { FormateDate } from "../../../helpers/utils";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useMediaQuery } from "@mui/material";
//
export const GuestHomePage = () => {
  const matches992 = useMediaQuery("(max-width:992px)");
  const matches576 = useMediaQuery("(max-width:576px)");
  const [value, setValue] = React.useState("1");
  const [falcuties, setFalcuties] = React.useState(undefined);
  const [academics, setAcademics] = React.useState(undefined);
  const [selectedFalcuty, setSelectedFalcuty] = React.useState(-1);
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  const [topics, setTopics] = React.useState(undefined);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    axios.get(apiEndpointLocal + path.falcuty.getall).then((rep) => {
      setSelectedFalcuty(rep.data[0].id);
      setFalcuties(rep.data);
    });
    axios.get(apiEndpointLocal + path.academic.getall).then((rep) => {
      setSelectedAcademic(rep.data[0].id);
      setAcademics(rep.data);
    });
  }, []);
  React.useEffect(() => {
    const data = {
      academicId: selectedAcademic,
      falcutyId: selectedFalcuty,
    };
    axios
      .post(apiEndpointLocal + path.students.topics, data)
      .then((response) => setTopics(response.data))
      .catch((err) => console.log(err));
  }, [selectedAcademic, selectedFalcuty]);
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
            fontSize={matches992 ? (matches576 ? 20 : 30) : 40}
            color="white"
            paddingTop={9}
          >
            Greenwich Idea Management System
          </Typography>
          <Typography
            fontSize={matches992 ? (matches576 ? 15 : 20) : 25}
            fontWeight={500}
            mt={3}
            color="white"
          >
            New Idea - New Exploration
          </Typography>
          <TextField
            id="search"
            type="search"
            sx={{
              width: matches992 ? (matches576 ? 300 : 500) : 850,
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
        <FormControl style={{ width: matches576 ? 150 : 250, marginRight: 10 }}>
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
        {matches992 ? (
          <FormControl style={{ width: matches576 ? 150 : 250 }}>
            <Typography variant="h8">Faculty</Typography>
            <NativeSelect
              defaultChecked={1}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(event) => setSelectedFalcuty(event.target.value)}
            >
              {falcuties?.map((obj, index) => {
                return (
                  <option key={index} value={obj.id}>
                    {obj.name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        ) : (
          ""
        )}
        <Grid container spacing={0}>
          <Grid xs={matches992 ? 12 : 9}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Topic" value="1" />
                    <Tab label="New Published Report" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  {" "}
                  <Box>
                    {topics === undefined && <CircularProgress />}
                    {topics?.length === 0 ? (
                      <Alert severity="info">No Data.</Alert>
                    ) : (
                      topics?.map((topic) => (
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/guest/topic/" + topic.id}
                        >
                          <Box mt={2}>
                            <Paper
                              elevation={2}
                              style={{ padding: "20px 20px" }}
                            >
                              <Box display="flex">
                                <TipsAndUpdatesIcon sx={{ fontSize: 80 }} />
                                <Box>
                                  <Typography fontWeight={600}>
                                    {topic.name}
                                  </Typography>
                                  <Typography>{topic.description}</Typography>
                                  <Typography>{topic.finalDate}</Typography>
                                </Box>
                              </Box>
                            </Paper>
                          </Box>
                        </Link>
                      ))
                    )}
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
          {matches992 ? (
            ""
          ) : (
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
                    Faculty
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
          )}
        </Grid>
      </Container>
    </>
  );
};
