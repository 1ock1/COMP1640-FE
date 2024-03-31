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

export const Dashboard = () => {
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
  const [seriesNb, setSeriesNb] = React.useState(3);
  const [itemNb, setItemNb] = React.useState(6);
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
      <Container maxWidth="">
        <Box sx={{ margin: "1rem 0rem" }} align="left">
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel id="demo-simple-select-label">Falcuty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={academicYears}
              defaultValue="2024"
              label="Academic year"
              onChange={(e) => handleChange(e.target.value)}
            >
              <MenuItem>IT</MenuItem>
              <MenuItem>Business</MenuItem>
              <MenuItem>Media</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "10rem" }} style={{ marginLeft: "2rem" }}>
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

        <Box sx={{ margin: "2rem 0rem" }} display={"flex"}>
          <Card sx={{ maxWidth: 200, minWidth: 200 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Total contributions
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                15
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 200, minWidth: 200 }}
            style={{ marginLeft: "2rem" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Total published
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                5
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 200, minWidth: 200 }}
            style={{ marginLeft: "2rem" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Submission rate
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                89%
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{ maxWidth: 200, minWidth: 200 }}
            style={{ marginLeft: "2rem" }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Published rate
              </Typography>

              <Typography sx={{ fontSize: 16 }} color="text.primary">
                205
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{ margin: "0rem" }}
          display={"flex"}
          fullWidth
          minHeight={250}
          justifyContent={"space-between"}
        >
          {/* <Paper elevation={3}> */}
          <BarChart
            height={400}
            width={1200}
            sx={{ width: "100%" }}
            series={series
              .slice(0, seriesNb)
              .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
            skipAnimation={skipAnimation}
            xAxis={[
              {
                data: ["IT", "Business", "Art", "Music", "Media", "Science"],
                scaleType: "band",
              },
            ]}
          />
          {/* </Paper> */}
          <Paper elevation={3} sx={{ padding: "1rem" }}>
            <Grid
              container
              spacing={0}
              width={250}
              style={{ padding: "0rem 1rem" }}
            >
              <Grid item xs={12} md={12}>
                <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
                  Quality of contributions
                </Typography>
                <FormControl sx={{ width: "10rem", height: "3rem" }}>
                  <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                  <Select
                    height="1rem"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={academicYears}
                    defaultValue="2024"
                    label="Academic year"
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    <MenuItem>1</MenuItem>
                    <MenuItem>2</MenuItem>
                    <MenuItem>3</MenuItem>
                  </Select>
                </FormControl>

                <Demo>
                  <List dense={dense} sx={{ ml: 1 }}>
                    {generate(
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          secondary="Topic 1"
                          primary=""

                          // secondary={secondary ? 'Secondary text' : null}
                        />
                      </ListItem>
                    )}
                  </List>
                </Demo>
              </Grid>
            </Grid>
          </Paper>
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
    data: [300, 266, 250, 305, 190, 200],
  },
  {
    label: "contributions commented",
    data: [268, 230, 250, 280, 190, 500],
  },
  {
    label: "Unsubmit",
    data: [10, 3, 2, 30, 15, 5],
  },
].map((s) => ({ ...s, highlightScope }));
