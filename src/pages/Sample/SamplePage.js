import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Paper } from '@mui/material';

const initialAccounts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'Admin', faculty: 'Engineering', department: 'Computer Science', isActive: true, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'User', faculty: 'Arts', department: 'English', isActive: true, image: '' }, // No image
];

const defaultImage = 'https://via.placeholder.com/150'; // URL of the default image

const Dashboard = ({ accounts }) => {
  const facultyCounts = {};
  accounts.forEach(account => {
    facultyCounts[account.faculty] = (facultyCounts[account.faculty] || 0) + 1;
  });

  return (
    <Paper style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h2>Dashboard</h2>
      <ul>
        {Object.entries(facultyCounts).map(([faculty, count]) => (
          <li key={faculty}>{faculty}: {count}</li>
        ))}
      </ul>
    </Paper>
  );
};

const AccountManagementPage = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', password: '', role: 'User', faculty: '', department: '', isActive: true, image: '' });
  const [editAccountId, setEditAccountId] = useState(null);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditAccountId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (event) => {
    setFormData({ ...formData, isActive: event.target.checked });
  };

  const handleEditAccount = (accountId) => {
    const accountToEdit = accounts.find(account => account.id === accountId);
    setFormData({ ...accountToEdit });
    setEditAccountId(accountId);
    handleDialogOpen();
  };

  const handleActiveToggle = (accountId) => {
    const updatedAccounts = accounts.map(account => {
      if (account.id === accountId) {
        return { ...account, isActive: !account.isActive };
      }
      return account;
    });
    setAccounts(updatedAccounts);
  };

  const handleAddAccount = () => {
    if (editAccountId !== null) {
      const updatedAccounts = accounts.map(account => {
        if (account.id === editAccountId) {
          return { ...formData };
        }
        return account;
      });
      setAccounts(updatedAccounts);
      handleDialogClose();
    } else {
      const newAccount = { ...formData, id: accounts.length + 1 };
      setAccounts([...accounts, newAccount]);
      setFormData({ id: '', name: '', email: '', password: '', role: 'User', faculty: '', department: '', isActive: true, image: '' });
      handleDialogClose();
    }
  };

  const departmentsCount = accounts.reduce((acc, account) => {
    acc[account.department] = (acc[account.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <Button variant="contained" onClick={handleDialogOpen}>Add Account</Button>
      <Dashboard accounts={accounts} />
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{editAccountId !== null ? 'Edit Account' : 'Add Account'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="normal"
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            fullWidth
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={handleInputChange}
            name="role"
            fullWidth
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
          <FormControlLabel
            control={<Switch checked={formData.isActive} onChange={handleSwitchChange} />}
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleAddAccount} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Students Count</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map(account => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.password}</TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell>{account.faculty}</TableCell>
              <TableCell>{account.department}</TableCell>
              <TableCell>
                <Switch checked={account.isActive} onChange={() => handleActiveToggle(account.id)} />
              </TableCell>
              <TableCell>
                <img src={account.image || defaultImage} alt={account.name} style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{departmentsCount[account.department] || 0}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleEditAccount(account.id)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountManagementPage;
