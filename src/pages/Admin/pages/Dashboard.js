import React from "react";

import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Card,
  CardContent,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";

import { BarChart } from "@mui/x-charts/BarChart";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const Dashboard = () => {
  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");


  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const [academicYears, setAcademicYears] = "";

  // chart
  const [seriesNb, setSeriesNb] = React.useState(2);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  //////
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  //////

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setSeriesNb(newValue);
  };
  ///////

  const handleChange = (event) => {
    setAcademicYears("2024");
    console.log(event);
  };

  return (
    <>
      <Container  maxWidth="xl">
        <Box sx={{ margin: "1rem 1rem" }} align="right">
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel id="demo-simple-select-label">Academic year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={academicYears}
              defaultValue="2024"
              label="Academic year"
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem>2024</MenuItem>
              <MenuItem>2023</MenuItem>
              <MenuItem>2022</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ margin: "0 1rem" }} display={"flex"} justifyContent={matches576?"space-around":""}>
          <Card sx={{ width: matches576?200:200 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Total contributions
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                238
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ width: matches576?200:200 }}
            style={{ marginLeft: "2rem" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Total topics
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                5
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{ margin: "1rem" }}
          display={matches576?"block":"flex"}
          fullWidth
          minHeight={250}
          justifyContent={"space-between"}
        >
          {/* <Paper elevation={3}> */}
          <BarChart
            height={matches576?300:400}
            series={series
              .slice(0, seriesNb)
              .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
            skipAnimation={skipAnimation}
            xAxis={[
              {
                data: ["IT", "Business", "Art", "Music", "Media"],
                scaleType: "band",
              },
            ]}
          />
          {/* </Paper> */}
          <>
          <Paper elevation={3}>
            <Grid container spacing={0} width={250} margin={"1rem"}>
              <Grid item xs={12} md={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  Topics
                </Typography>
                <Demo>
                  <List dense={dense}>
                    {generate(
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Topic 1"
                          // secondary={secondary ? 'Secondary text' : null}
                        />
                      </ListItem>
                    )}
                  </List>
                </Demo>
              </Grid>
            </Grid>
            </Paper>
          </>
        </Box>
      </Container>
    </>
  );
};

const highlightScope = {
  highlighted: "series",
  faded: "global",
};

const series = [
  {
    label: "Total contributions",
    data: [300, 266, 250, 305, 190],
  },
  {
    label: "contributions commented",
    data: [268, 230, 250, 280, 190],
  },
].map((s) => ({ ...s, highlightScope }));
export default Dashboard;
