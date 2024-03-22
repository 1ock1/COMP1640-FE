import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

const theme = createTheme();

const FacultyManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    id: null,
    name: '',
    description: '',
    image: '',
  });
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'Faculty 1',
      description: 'Description of Faculty 1',
      image: 'https://via.placeholder.com/150',
      students: ['Student 1', 'Student 2'],
      teachers: ['Teacher 1', 'Teacher 2'],
    },
    {
      id: 2,
      name: 'Faculty 2',
      description: 'Description of Faculty 2',
      image: 'https://via.placeholder.com/150',
      students: ['Student 3', 'Student 4'],
      teachers: ['Teacher 3', 'Teacher 4'],
    },
  ]);

  const [editingFaculty, setEditingFaculty] = useState(null);

  const handleAddFaculty = () => {
    if (newFaculty.name.trim() !== '') {
      setFaculties([...faculties, { ...newFaculty, id: Date.now(), students: [], teachers: [] }]);
      setNewFaculty({
        id: null,
        name: '',
        description: '',
        image: '',
      });
      setOpenDialog(false);
    } else {
      alert('Please enter a valid faculty name.');
    }
  };

  const handleDeleteFaculty = (id) => {
    const newFaculties = faculties.filter((faculty) => faculty.id !== id);
    setFaculties(newFaculties);
  };

  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setNewFaculty(faculty);
    setOpenDialog(true);
  };

  const handleUpdateFaculty = () => {
    if (newFaculty.name.trim() !== '') {
      const updatedFaculties = faculties.map((faculty) => {
        if (faculty.id === editingFaculty.id) {
          return newFaculty;
        }
        return faculty;
      });
      setFaculties(updatedFaculties);
      setNewFaculty({
        id: null,
        name: '',
        description: '',
        image: '',
      });
      setEditingFaculty(null);
      setOpenDialog(false);
    } else {
      alert('Please enter a valid faculty name.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(2) }}>
        <Typography variant="h4" gutterBottom>
          Faculty Management Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Paper elevation={3}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Students
                  </Typography>
                  <List>
                    {faculties.map((faculty) => (
                      <ListItem key={faculty.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={faculty.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Teachers
                  </Typography>
                  <List>
                    {faculties.map((faculty) => (
                      <ListItem key={faculty.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <SchoolIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={faculty.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3}>
                  <Typography variant="h6" align="center" gutterBottom>
                    Staff
                  </Typography>
                  <List>
                    {faculties.map((faculty) => (
                      <ListItem key={faculty.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <SchoolIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={faculty.name} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3}>
              <List>
                {faculties.map((faculty) => (
                  <ListItem key={faculty.id} sx={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>
                    <ListItemAvatar>
                      <Avatar alt={faculty.name} src={faculty.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={faculty.name}
                      secondary={
                        <>
                          <div>Description: {faculty.description}</div>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEditFaculty(faculty)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFaculty(faculty.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box component={Paper} p={3} elevation={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingFaculty(null);
                  setOpenDialog(true);
                }}
              >
                Add Faculty
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{editingFaculty ? 'Update Faculty' : 'Add New Faculty'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the details of the {editingFaculty ? 'updated ' : 'new '} faculty:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Faculty Name"
              type="text"
              fullWidth
              value={newFaculty.name}
              onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
            />
            <TextField margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={newFaculty.description}
              onChange={(e) => setNewFaculty({ ...newFaculty, description: e.target.value })}
            />
            <TextField
              margin="dense"
              id="image"
              label="Image URL"
              type="text"
              fullWidth
              value={newFaculty.image}
              onChange={(e) => setNewFaculty({ ...newFaculty, image: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            {editingFaculty ? (
              <Button onClick={handleUpdateFaculty} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={handleAddFaculty} color="primary">
                Add
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default FacultyManagementPage;
             
