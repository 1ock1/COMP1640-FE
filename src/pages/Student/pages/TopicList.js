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
} from "@mui/material";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ArticleIcon from "@mui/icons-material/Article";
import TabPanel from "@mui/lab/TabPanel";
import { Options } from "../../../helpers/contanst";
import axios from "axios";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import { TopicTabPanelList } from "../TopicTabPanelList";
//
export const TopicList = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Grid container spacing={0}>
          <Grid xs={9}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Topic" value="1" />
                    <Tab label="Your Submission" value="2" />
                    <Tab label="New Published Report" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <TopicTabPanelList />
                </TabPanel>
                <TabPanel value="2">Your Submission</TabPanel>
                <TabPanel value="3">New Published Report</TabPanel>
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
                    {Options.student?.map((obj, index) => (
                      <ListItem
                        key={index}
                        disablePadding
                        style={{ display: "block" }}
                      >
                        <Link
                          to={obj.link}
                          className="nav_header-link"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <ListItemButton>
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={obj.value} />
                          </ListItemButton>
                        </Link>
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
