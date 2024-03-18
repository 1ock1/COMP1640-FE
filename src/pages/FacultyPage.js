import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
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
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();

const FacultyManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState('');
  const [newFacultyDescription, setNewFacultyDescription] = useState('');
  const [newFacultyImage, setNewFacultyImage] = useState('');
  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'Faculty 1',
      description: 'Description for Faculty 1',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Faculty 2',
      description: 'Description for Faculty 2',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Faculty 3',
      description: 'Description for Faculty 3',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const [editingFaculty, setEditingFaculty] = useState(null);

  const handleAddFaculty = () => {
    if (newFacultyName.trim() !== '') {
      setFaculties([...faculties, { id: Date.now(), name: newFacultyName, description: newFacultyDescription, image: newFacultyImage }]);
      setNewFacultyName('');
      setNewFacultyDescription('');
      setNewFacultyImage('');
      setOpenDialog(false);
    }
  };

  const handleDeleteFaculty = (id) => {
    const newFaculties = faculties.filter(faculty => faculty.id !== id);
    setFaculties(newFaculties);
  };

  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setOpenDialog(true);
  };

  const handleUpdateFaculty = () => {
    if (newFacultyName.trim() !== '') {
      const updatedFaculties = faculties.map(faculty => {
        if (faculty.id === editingFaculty.id) {
          return { ...faculty, name: newFacultyName, description: newFacultyDescription, image: newFacultyImage };
        }
        return faculty;
      });
      setFaculties(updatedFaculties);
      setNewFacultyName('');
      setNewFacultyDescription('');
      setNewFacultyImage('');
      setEditingFaculty(null);
      setOpenDialog(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: theme.spacing(2) }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              style={{ marginBottom: theme.spacing(2) }}
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingFaculty(null);
                setOpenDialog(true);
              }}
            >
              Add Faculty
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {faculties.map((faculty) => (
                <ListItem key={faculty.id} sx={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>
                  <Avatar
                    alt={faculty.name}
                    src={faculty.image}
                    sx={{ width: theme.spacing(7), height: theme.spacing(7), marginRight: theme.spacing(2) }}
                  />
                  <ListItemText primary={faculty.name} secondary={faculty.description} />
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
              value={newFacultyName}
              onChange={(e) => setNewFacultyName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              value={newFacultyDescription}
              onChange={(e) => setNewFacultyDescription(e.target.value)}
            />
            <TextField
              margin="dense"
              id="image"
              label="Image URL"
              type="text"
              fullWidth
              value={newFacultyImage}
              onChange={(e) => setNewFacultyImage(e.target.value)}
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
