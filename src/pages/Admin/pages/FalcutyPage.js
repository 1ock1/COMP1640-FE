import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
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
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { set } from "react-hook-form";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import { useMediaQuery } from "@mui/material";

const theme = createTheme();

const FacultyManagementPage = () => {

  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");

  const [openDialog, setOpenDialog] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newStatus, setNewStatus] = useState(true);

  const [faculties, setFaculties] = useState([]);

  const [editingFaculty, setEditingFaculty] = useState(true);

  // update
  const [updateName, setUpdateName] = useState("");
  const [updateStatus, setUpdateStatus] = useState(true);
  const [selectedRow, setSelectedRow] = useState("");

  

  useEffect(() => {
    axios
      .get(apiEndpointLocal + path.falcuty.getall)
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleAddFaculty = () => {
    axios
      .post(apiEndpointLocal + path.falcuty.create, {
        name: newFacultyName,
        status: newStatus,
      })
      .then((response) => {
        setFaculties([...faculties, response.data]);
        setNewFacultyName("");
        setNewStatus(true);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDeleteFaculty = (id) => {};

  const handleEditFaculty = (faculty) => {
    setUpdateName(faculty.name);

    setSelectedRow(faculty);
    setOpenDialog(true);
  };

  const handleUpdateFaculty = (index) => {
    axios
      .put(apiEndpointLocal + path.falcuty.update + index.id, {
        name: updateName,
        status: updateStatus,
      })
      .then((response) => {
        setFaculties(
          faculties.map((faculty) =>
            faculty.id === index.id
              ? { ...faculty, name: updateName, status: updateStatus }
              : faculty
          )
        );

        setUpdateName("");
        setUpdateStatus(true);
        setSelectedRow("");
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleChange = () => {
    if (newStatus) {
      setNewStatus(false);
    } else {
      setNewStatus(true);
    }

    if (updateStatus) {
      setUpdateStatus(false);
    } else {
      setUpdateStatus(true);
    }
  };

  return (
    <Container maxWidth="xl">
      <ThemeProvider theme={theme}>
        <div style={{ padding: theme.spacing(2) }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                style={{ marginBottom: theme.spacing(2), float: "right" }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingFaculty(false);
                  setOpenDialog(true);
                }}
              >
                Add Faculty
              </Button>
            </Grid>
            <Grid item xs={12}>
              <List>
                {faculties.map((faculty) => (
                  <ListItem
                    key={faculty.id}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    <Avatar
                      alt={faculty.name}
                      src={faculty.image}
                      sx={{
                        width: theme.spacing(7),
                        height: theme.spacing(7),
                        marginRight: theme.spacing(2),
                      }}
                    />
                    <ListItemText
                      primary={faculty.name}
                      secondary={faculty.status ? "Active" : "Disable"}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => {
                          handleEditFaculty(faculty);
                          setEditingFaculty(true);
                          setUpdateStatus(faculty.status);
                          setEditingFaculty(faculty);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteFaculty(faculty.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle id="form-dialog-title">
              {editingFaculty ? "Update Faculty" : "Add New Faculty"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the details of the {editingFaculty ? "updated " : "new "}{" "}
                faculty:
              </DialogContentText>
              <Box justifyContent={"space-between"}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Faculty Name"
                  type="text"
                  fullWidth
                  value={editingFaculty ? updateName : newFacultyName}
                  onChange={(e) =>
                    editingFaculty
                      ? setUpdateName(e.target.value)
                      : setNewFacultyName(e.target.value)
                  }
                />
                <Box sx={{ height: "1rem" }}></Box>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                      selectedRow !== ""
                        ? updateStatus
                          ? "Active"
                          : "Disable"
                        : newStatus
                        ? "Active"
                        : "Disable"
                    }
                    label="Status"
                    onChange={() => handleChange()}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Disable"}>Disable</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="primary">
                Cancel
              </Button>
              {editingFaculty ? (
                <Button
                  color="primary"
                  onClick={() => handleUpdateFaculty(selectedRow)}
                >
                  Update
                </Button>
              ) : (
                <Button onClick={() => handleAddFaculty()} color="primary">
                  Add
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FacultyManagementPage;
