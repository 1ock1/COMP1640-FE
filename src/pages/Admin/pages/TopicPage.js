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
import EditIcon from "@mui/icons-material/Edit";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";

const theme = createTheme();

const TopicManagementPage = () => {
  //Open Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [addMode, setAddMode] = useState(true);
  // Add Topic
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  // date of Topic
  const [entriesDatez, setEntriesDatez] = useState("");
  const [finalDatez, setFinalDatez] = useState("");
  // all Topics
  const [topics, setTopics] = useState([]);

  // Faculties
  const [faculties, setFaculties] = useState([]);
  const [faculty, setFaculty] = useState("");
  // Academics
  const [academics, setAcademics] = useState([]);
  const [academic, setAcademic] = useState("");
  // Academic Year
  const [academicStartDate, setAcademicStartDate] = useState("");
  const [academicEndDate, setAcademicEndDate] = useState("");
  // Fields Disabled
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(true);

  // update State
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedEntriesDate, setSelectedEntriesDate] = useState("");
  const [selectedFinalDate, setSelectedFinalDate] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedAcademic, setSelectedAcademic] = useState("");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(apiEndpointStaging + path.topic.getall);
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
      const response = await axios.get(
        apiEndpointStaging + path.falcuty.getall
      );
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
      const response = await axios.get(
        apiEndpointStaging + path.academic.getall
      );
      setAcademics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleAddTopic = () => {
    axios({
      method: "post",
      url: apiEndpointStaging + path.topic.create,
      data: {
        name: newTopic,
        description: newDescription,
        entriesDate: entriesDatez,
        finalDate: finalDatez,
        falcutyId: faculty.id,
        academicId: academic.id,
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
            finalDate: finalDatez,
            faculty: faculty.id,
            academic: academic.id,
          },
        ]);
        setNewTopic("");
        setNewDescription("");
        setEntriesDatez("");
        setFinalDatez("");
        setFaculty("");
        setAcademic("");
        setOpenDialog(false);
        setAcademicEndDate("");
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
      .delete(apiEndpointStaging + path.topic.delete + index, {
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
        setOpenDialog(false);
        setTopics(topics.filter((topic) => topic.id !== index));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const handleEditTopic = async (index) => {
    try {
      const url = apiEndpointStaging + path.topic.update + index;
      const response = await axios.put(url, {
        name: selectedName,
        description: selectedDescription,
        entriesDate: selectedEntriesDate,
        finalDate: selectedFinalDate,
      });

      if (response.status !== 200) {
        throw new Error(`Update failed with status code: ${response.status}`);
      }
      setNewTopic("");
      setNewDescription("");
      setEntriesDatez("");
      setFinalDatez("");
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleFildChange = (e) => {
    setIsFieldsDisabled(false);

    let academic = academics.filter(
      (academic) => academic.startDate.toString().split("T")[0] === e
    );

    setAcademic(academic[0]);

    setAcademicEndDate(academic[0].endDate.toString().split("T")[0]);
  };

  const handleEtriDatesChange = (e) => {
    let entriesDate = new Date(e);
    let formattedDate = entriesDate.toISOString().split("T")[0];
    let academicStartDate = new Date(academic.startDate);

    if (entriesDate < academicStartDate) {
      alert(
        "The topic start date needs to be later than the school year start date"
      );
    } else {
      setEntriesDatez(formattedDate);
    }
  };

  const handleFinalDateChange = (e) => {
    let finalDate = new Date(e);

    let formattedDate = finalDate.toISOString().split("T")[0];

    let academicEndDate = new Date(academic.endDate);

    if (finalDate > academicEndDate) {
      alert(
        "The topic end date needs to be earlier than the school year end date"
      );
    } else {
      setFinalDatez(formattedDate);
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
                onClick={() => {
                  setAddMode(true);
                  setOpenDialog(true);
                }}
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
                      <TableCell align="right">Final Date</TableCell>
                      <TableCell align="right">FalcultyId</TableCell>
                      <TableCell align="right">AcademicId</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          padding: "0 2rem",
                        }}
                      ></TableCell>{" "}
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
                        <TableCell align="right">{row.falcutyId}</TableCell>{" "}
                        <TableCell align="right">{row.academicId}</TableCell>{" "}
                        <TableCell align="right">
                          {
                            <EditIcon
                              onClick={async () => {
                                await setAddMode(false);
                                await setSelectedRow(row.id);
                                await setSelectedName(row.name);
                                await setSelectedDescription(row.description);
                                let entriesDate = row.entriesDate
                                  .toString()
                                  .split("T")[0];
                                await setSelectedEntriesDate(entriesDate);
                                let finalDate = row.finalDate
                                  .toString()
                                  .split("T")[0];
                                await setSelectedFinalDate(finalDate);

                                let faculty = faculties.filter(
                                  (faculty) => faculty.id === row.falcutyId
                                );
                                let academic = academics.filter(
                                  (academic) => academic.id === row.academicId
                                );
                                await setSelectedFaculty(faculty[0]);
                                await setSelectedAcademic(
                                  academic[0].startDate.toString().split("T")[0]
                                );
                                await setAcademicEndDate(
                                  academic[0].endDate.toString().split("T")[0]
                                );

                                setOpenDialog(true);
                              }}
                              style={{ color: "#3d6bb3" }}
                            ></EditIcon>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          {addMode ? (
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
                    disablePortal
                    id="combo-box-demo"
                    options={faculties.map((option) => option.name)}
                    sx={{ width: 251 }}
                    onChange={(event, value) => {
                      let facultyId = faculties.filter(
                        (faculty) => faculty.name === value
                      );

                      setFaculty(facultyId[0]);
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="Falcuty"
                        margin="normal"
                        name="academic"
                        value={faculty}
                        type="text"
                        {...params}
                      />
                    )}
                  />
                </Box>
              </DialogContent>

              <DialogActions className="AddTopic">
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
          ) : (
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              aria-labelledby="form-dialog-title"
              maxWidth="sm" //
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">UpdateTopic</DialogTitle>
              <DialogContent>
                <DialogContentText>Update the topis details:</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Topic Name"
                  type="text"
                  fullWidth
                  value={selectedName}
                  onChange={(e) => setNewTopic(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  value={selectedDescription}
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
                    defaultValue={selectedAcademic}
                    renderInput={(params) => (
                      <TextField
                        label="Academic"
                        margin="normal"
                        name="academic"
                        type={"date"}
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
                    defaultValue={selectedEntriesDate}
                    onChange={(e) => {
                      let entriDate = e.target.value;
                      handleEtriDatesChange(entriDate);
                    }}
                    // disabled={isFieldsDisabled}
                  />
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                  <TextField
                    id="academicEndDate"
                    margin="normal"
                    name="academicEndDate"
                    label="Academic End Date"
                    defaultValue={academicEndDate}
                    type={"date"}
                    fullWidth
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
                    defaultValue={selectedFinalDate}
                    onChange={(e) => {
                      let finalDate = e.target.value;

                      handleFinalDateChange(finalDate);
                    }}
                    // disabled={isFieldsDisabled}
                  />
                </Box>

                <Box display={"flex"} justifyContent={"space-between"}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={faculties.map((option) => option.name)}
                    sx={{ width: 251 }}
                    defaultValue={selectedFaculty.name}
                    onChange={(event, value) => {
                      let facultyId = faculties.filter(
                        (faculty) => faculty.name === value
                      );

                      setFaculty(facultyId);
                    }}
                    renderInput={(params) => (
                      <TextField
                        label="Falcuty"
                        margin="normal"
                        name="academic"
                        value={faculty}
                        type="text"
                        {...params}
                      />
                    )}
                  />
                  {/* <Button>
                    <DeleteIcon
                      style={{ color: "red" }}
                      onClick={() => handleDeleteTopic(selectedRow)}
                    />
                  </Button> */}
                </Box>
              </DialogContent>

              <DialogActions className="UpdateTopic">
                <Button onClick={() => setOpenDialog(false)} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => handleEditTopic(selectedRow)}
                  color="primary"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default TopicManagementPage;
