import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { formattedDate } from "../../../helpers/contanst";
import { set } from "react-hook-form";
import { date } from "zod";

const theme = createTheme();

const TopicManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [entriesDatez, setEntriesDatez] = useState("");
  const [finalDatez, setFinalDatez] = useState("");

  const [topics, setTopics] = useState([]);

  const [faculties, setFaculties] = useState([]);
  const [faculty, setFaculty] = useState("");

  const [academics, setAcademics] = useState([]);
  const [academic, setAcademic] = useState("");

  const [academicStartDate, setAcademicStartDate] = useState("");
  const [academicEndDate, setAcademicEndDate] = useState("");

  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7044/api/Topic/GetAllTopic"
      );
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchFalcuty();
  }, []);

  const fetchFalcuty = async () => {
    try {
      const response = await axios.get("https://localhost:7044/api/Faculty");
      setFaculties(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    fetchAcademic();
  }, []);

  const fetchAcademic = async () => {
    try {
      const response = await axios.get("https://localhost:7044/api/Academic");
      setAcademics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleAddTopic = () => {
    axios({
      method: "post",
      url: "https://localhost:7044/api/Topic/CreateTopic",
      data: {
        name: newTopic,
        description: newDescription,
        entriesDate: entriesDatez,
        finalDate: finalDatez,
        falcuty: faculties,
        academic: academic,
      },
    })
      .then((response) => {
        if (!response.status === 200) {
          throw new Error("Network response was not ok");
        }
        // handle your data here
        setTopics([
          ...topics,
          {
            id: response.data.id,
            name: newTopic,
            description: newDescription,
            entriesDate: entriesDatez,
          },
        ]);
        setNewTopic("");
        setNewDescription("");
        setEntriesDatez("");
        setFinalDatez("");
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleDeleteTopic = (index) => {
    axios
      .delete(`https://localhost:7044/api/Topic/DeleteTopic?id=${index}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id: index },
      })
      .then((response) => {
        if (!response.status === 200) {
          throw new Error("Network response was not ok");
        }
        // handle your data here
        setTopics(topics.filter((topic) => topic.id !== index));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleFildChange = (e) => {
    setIsFieldsDisabled(false);

    setAcademicStartDate(new Date(e).toString().split("T")[0]);
    
    let academicDate = academics.filter(
      (academic) => academic.startDate.toString().split("T")[0] === e
    );

    setAcademic(academicDate[0].id);
    setAcademicEndDate(academicDate[0].endDate.toString().split("T")[0]);
  };

  const handleEtriDatesChange = (e) => {
    let entriesDate = new Date(e);
    let academicStartDateFormatted = new Date(academicStartDate);

    console.log(entriesDate);
    console.log(academicStartDateFormatted);


    if (entriesDate < academicStartDateFormatted) {
      alert(
        "The topic start date needs to be later than the school year start date"
      );
    } else {
      setEntriesDatez(entriesDate);
    }
  };

  const handleFinalDateChange = (e) => {
    let finalDate = new Date(e);
    let academicEndDateFormatted = new Date(academicEndDate);

    if (finalDate > academicEndDateFormatted) {
      alert(
        "The topic end date needs to be earlier than the school year end date"
      );
    } else {
      setFinalDatez(finalDate);
    }
  };

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ padding: theme.spacing(2) }}>
          <Grid container spacing={3}>
            <Grid item xs={12} align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Add Topic
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Topic Name</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="right">Entries Date</TableCell>
                      <TableCell align="right">Falculty</TableCell>
                      <TableCell align="right">Academic</TableCell>
                      <TableCell align="right">Final Date</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: "0 2rem",
                        }}
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topics.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: 100,
                          }}
                        >
                          {row.description}
                        </TableCell>
                        <TableCell align="right">
                          {row.entriesDate.toString().split("T")[0]}
                        </TableCell>
                        <TableCell align="right">
                          {row.finalDate.toString().split("T")[0]}
                        </TableCell>{" "}
                        <TableCell align="right">{row.faculty}</TableCell>{" "}
                        <TableCell align="right">{row.academic}</TableCell>{" "}
                        <TableCell align="right">
                          {
                            <DeleteIcon
                              onClick={() => handleDeleteTopic(row.id)}
                              style={{ color: "red" }}
                            ></DeleteIcon>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm" //
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title">Add New Topic</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the name and description of the new topic:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Topic Name"
                type="text"
                fullWidth
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />

              <Box display={"flex"} justifyContent={"space-between"}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={academics.map(
                    (option) => option.startDate.toString().split("T")[0]
                  )}
                  sx={{ width: 251 }}
                  onChange={(event, value) => {
                    handleFildChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      label="Academic"
                      margin="normal"
                      name="academic"
                      value={academicStartDate}
                      type={academicStartDate === "" ? "text" : "date"}
                      {...params}
                    />
                  )}
                />
                {/* <Box width={52} /> */}
                <TextField
                  sx={{ width: 251 }}
                  id="entriesDate"
                  margin="normal"
                  name="entriesDate"
                  label="Entries Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={entriesDatez}
                  onChange={(e) => {
                    let entriDate = e.target.value;
                    handleEtriDatesChange(entriDate);
                  }}
                  disabled={isFieldsDisabled}
                />
              </Box>

              <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                  id="academicEndDate"
                  margin="normal"
                  name="academicEndDate"
                  label="Academic End Date"
                  type={academicStartDate === "" ? "text" : "date"}
                  fullWidth
                  value={academicEndDate}
                  disablePortal
                  sx={{ width: 251 }}
                  inputProps={{ readOnly: true }}
                />

                <TextField
                  sx={{ width: 251 }}
                  id="finalDate"
                  margin="normal"
                  name="finalDate"
                  label="Final Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={finalDatez}
                  onChange={(e) => {
                    let finalDate = e.target.value;

                    handleFinalDateChange(finalDate);
                  }}
                  disabled={isFieldsDisabled}
                />
              </Box>

              <Box display={"flex"} justifyContent={"space-between"}>
                <Autocomplete
                  disabled={isFieldsDisabled}
                  disablePortal
                  id="combo-box-demo"
                  options={faculties.map((option) => option.name)}
                  sx={{ width: 300 }}
                  onChange={(e) => {
                    let faculty = e.target.value;

                    console.log(faculty);
                  }}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      name="falcuty"
                      label="Falcuty"
                      {...params}
                      value={faculty}
                    />
                  )}
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              <Button
                disabled={isFieldsDisabled}
                onClick={handleAddTopic}
                color="primary"
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default TopicManagementPage;
