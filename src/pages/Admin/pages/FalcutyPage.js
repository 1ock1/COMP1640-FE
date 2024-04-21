import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

const theme = createTheme();

const FacultyManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newStatus, setNewStatus] = useState(true);

  const [faculties, setFaculties] = useState([]);

  // Use a separate state for temporary faculty data
  const [tempFaculty, setTempFaculty] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [updateStatus, setUpdateStatus] = useState(true); // Initial value can be adjusted as needed


  const handleAddFaculty = () => {
    const newFaculty = {
      id: Math.random().toString(36).substring(2, 15),
      name: newFacultyName,
      status: newStatus,
      isTemporary: true, // tao mac temporary (Du lieu tam thoi)
    };

    setFaculties([...faculties, newFaculty]);
    setNewFacultyName("");
    setNewStatus(true);
    setOpenDialog(false);
  };

  const handleDeleteFaculty = (id) => {
    setFacultyToDelete(id);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    if (!facultyToDelete) return;
    const updatedFaculties = faculties.filter((faculty) => faculty.id !== facultyToDelete);
    setFaculties(updatedFaculties);

    setShowConfirmDelete(false);
    setFacultyToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
    setFacultyToDelete(null);
  };

  const handleEditFaculty = (faculty) => {
    setTempFaculty(faculty);

    setNewFacultyName(faculty.name);
    setNewStatus(faculty.status);

    setOpenDialog(true);
  };

  const handleUpdateFaculty = () => {
    if (!tempFaculty) return;

    const facultyIndex = faculties.findIndex((f) => f.id === tempFaculty.id);

    if (facultyIndex !== -1) {
      const updatedFaculties = [...faculties];
      updatedFaculties[facultyIndex] = {
        ...updatedFaculties[facultyIndex],
        name: newFacultyName,
        status: newStatus,
      };

      setFaculties(updatedFaculties);

      setTempFaculty(null);
      setNewFacultyName("");
      setNewStatus(true);
      setOpenDialog(false);
    }
  };

  const handleChange = () => {
    setNewStatus(!newStatus);
  };

  return (
    <Container maxWidth="false">
      <ThemeProvider theme={theme}>
        <div style={{ padding: theme.spacing(2) }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                style={{ marginBottom: theme.spacing(2) }}
                variant="contained"
                color="primary"
                onClick={() => {
                  setTempFaculty(null);
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
                      width: { xs: "100%", md: "50%" }, // phu hop voi screen tu <576px cho den 768px
                    }}
                  >
                    <Avatar
                      alt={faculty.name}
                      src={faculty.image}
                      sx={{ width: theme.spacing(7), height: theme.spacing(7), marginRight: theme.spacing(2) }}
                    />
                    <ListItemText
                      primary={faculty.name}
                      secondary={faculty.status ? "Active" : "Disable"}
                    />
                    <ListItemSecondaryAction>
                      {faculty.isTemporary && (
                        <Typography variant="caption" color="warning" display="block">
                          Temporary
                          <WarningIcon fontSize="small" style={{ marginLeft: "4px" }} />
                        </Typography>
                      )}
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditFaculty(faculty)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFaculty(faculty.id)}>
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
            fullWidth
          >
            <DialogTitle id="form-dialog-title">
              {editingFaculty ? "Update Faculty" : "Add New Faculty"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the details of the {editingFaculty ? "updated " : "new "}
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
                    editingFaculty ? setUpdateName(e.target.value) : setNewFacultyName(e.target.value)
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
                <Button onClick={() => handleUpdateFaculty(selectedRow)} color="primary">
                  Update
                </Button>
              ) : (
                <Button onClick={() => handleAddFaculty()} color="primary">
                  Add
                </Button>
              )}
            </DialogActions>
          </Dialog>

          {showConfirmDelete && (
            <Dialog open={showConfirmDelete} onClose={handleCancelDelete}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>Are you sure you want to delete this faculty?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default FacultyManagementPage;