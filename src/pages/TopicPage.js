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
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();

const TopicManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [topics, setTopics] = useState([
    { name: 'Topic 1', description: 'Description for Topic 1' },
    { name: 'Topic 2', description: 'Description for Topic 2' },
    { name: 'Topic 3', description: 'Description for Topic 3' },
  ]);

  const handleAddTopic = () => {
    if (newTopic.trim() !== '') {
      setTopics([...topics, { name: newTopic, description: newDescription }]);
      setNewTopic('');
      setNewDescription('');
    }
  };

  const handleDeleteTopic = (index) => {
    const newTopics = [...topics];
    newTopics.splice(index, 1);
    setTopics(newTopics);
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
              onClick={() => setOpenDialog(true)}
            >
              Add Topic
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {topics.map((topic, index) => (
                <ListItem key={index} sx={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>
                  <ListItemText primary={topic.name} secondary={topic.description} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTopic(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Topic</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the name and description of the new topic:</DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAddTopic} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default TopicManagementPage;