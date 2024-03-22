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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme();

const AccountManagementPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [newAccount, setNewAccount] = useState({
    id: null,
    department: '',
    fullName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    userRole: '',
    faculty: '',
    facultyId: '',
    image: '', // New attribute for account image URL
  });
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      department: 'Department 1',
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      email: 'john.doe@example.com',
      password: 'password123',
      userRole: 'Admin',
      faculty: 'Faculty 1',
      facultyId: 'F1',
      image: 'https://via.placeholder.com/150', // Example image URL
    },
    {
      id: 2,
      department: 'Department 2',
      fullName: 'Jane Smith',
      dateOfBirth: '1995-05-15',
      email: 'jane.smith@example.com',
      password: 'password456',
      userRole: 'User',
      faculty: 'Faculty 2',
      facultyId: 'F2',
      image: 'https://via.placeholder.com/150', // Example image URL
    },
  ]);

  const [editingAccount, setEditingAccount] = useState(null);

  const handleAddAccount = () => {
    if (newAccount.fullName.trim() !== '' && newAccount.email.trim() !== '') {
      setAccounts([...accounts, { ...newAccount, id: Date.now() }]);
      setNewAccount({
        id: null,
        department: '',
        fullName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        userRole: '',
        faculty: '',
        facultyId: '',
        image: '',
      });
      setOpenDialog(false);
    } else {
      alert('Please enter a valid full name and email.');
    }
  };

  const handleDeleteAccount = (id) => {
    const newAccounts = accounts.filter((account) => account.id !== id);
    setAccounts(newAccounts);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setNewAccount(account);
    setOpenDialog(true);
  };

  const handleUpdateAccount = () => {
    if (newAccount.fullName.trim() !== '' && newAccount.email.trim() !== '') {
      const updatedAccounts = accounts.map((account) => {
        if (account.id === editingAccount.id) {
          return newAccount;
        }
        return account;
      });
      setAccounts(updatedAccounts);
      setNewAccount({
        id: null,
        department: '',
        fullName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        userRole: '',
        faculty: '',
        facultyId: '',
        image: '',
      });
      setEditingAccount(null);
      setOpenDialog(false);
    } else {
      alert('Please enter a valid full name and email.');
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
                setEditingAccount(null);
                setOpenDialog(true);
              }}
            >
              Add Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <List>
              {accounts.map((account) => (
                <ListItem key={account.id} sx={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>
                  <ListItemAvatar>
                    <Avatar alt={account.fullName} src={account.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={account.fullName}
                    secondary={
                      <>
                        <div>Department: {account.department}</div>
                        <div>Date of Birth: {account.dateOfBirth}</div>
                        <div>Email: {account.email}</div>
                        <div>User Role: {account.userRole}</div>
                        <div>Faculty: {account.faculty}</div>
                        <div>Faculty ID: {account.facultyId}</div>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditAccount(account)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAccount(account.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{editingAccount ? 'Update Account' : 'Add New Account'}</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the details of the {editingAccount ? 'updated ' : 'new '} account:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="department"
              label="Department"
              type="text"
              fullWidth
              value={newAccount.department}
              onChange={(e) => setNewAccount({ ...newAccount, department: e.target.value })}
            />
            <TextField
              margin="dense"
              id="fullName"
              label="Full Name"
              type="text"
              fullWidth
              value={newAccount.fullName}
              onChange={(e) => setNewAccount({ ...newAccount, fullName: e.target.value })}
            />
            <TextField
              margin="dense"
              id="dateOfBirth"
              label="Date of Birth"
              type="date"
              fullWidth
              value={newAccount.dateOfBirth}
              onChange={(e) => setNewAccount({ ...newAccount, dateOfBirth: e.target.value })}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={newAccount.email}
              onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
            />
            <TextField
              margin="dense"
              id="userRole"
              label="User Role"
              type="text"
              fullWidth
              value={newAccount.userRole}
              onChange={(e) => setNewAccount({ ...newAccount, userRole: e.target.value })}
            />
            <TextField
              margin="dense"
              id="faculty"
              label="Faculty"
              type="text"
              fullWidth
              value={newAccount.faculty}
              onChange={(e) => setNewAccount({ ...newAccount, faculty: e.target.value })}
            />
            <TextField
              margin="dense"
              id="facultyId"
              label="Faculty ID"
              type="text"
              fullWidth
              value={newAccount.facultyId}
              onChange={(e) => setNewAccount({ ...newAccount, facultyId: e.target.value })}
            />
            <TextField
              margin="dense"
              id="image"
              label="Image URL"
              type="text"
              fullWidth
              value={newAccount.image}
              onChange={(e) => setNewAccount({ ...newAccount, image: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            {editingAccount ? (
              <Button onClick={handleUpdateAccount} color="primary">
                Update
              </Button>
            ) : (
              <Button onClick={handleAddAccount} color="primary">
                Add
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default AccountManagementPage;