import { Container } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { checkAuth } from "../../../actions/UserActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function createData(
  account_username,
  account_password,
  account_id,
  account_name,
  account_dob,
  account_department,
  account_faculty,
  account_role
) {
  return {
    account_username,
    account_password,
    account_id,
    account_name,
    account_dob,
    account_department,
    account_faculty,
    account_role,
  };
}

const rows = [
  createData(
    "minhnvqgch200711",
    "123123",
    1,
    "Nguyen Vu Quang Minh",
    "24/10/2002",
    "IT",
    "Ha Noi",
    "Student"
  ),
  createData(
    "thainqgch210000",
    "123123",
    1,
    "Nguyen Quang Thai",
    "24/10/2002",
    "IT",
    "Ha Noi",
    "Student"
  ),
  createData(
    "minhnngch200000",
    "123123",
    1,
    "Nguyen Ngoc Minh",
    "24/10/2002",
    "IT",
    "Ha Noi",
    "Student"
  ),
  createData(
    "anhndgch190000",
    "123123",
    1,
    "Nguyen Duc Anh",
    "24/10/2002",
    "IT",
    "Ha Noi",
    "Student"
  ),
  3,
];

export default function AccountManagementPage() {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const Clicked = () => {
    alert("Account Successfully Updated!!!");
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  document.addEventListener("DOMContentLoaded", function () {
    function cancelButtonHandle() {}
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.id = "cancelButton";
    const Box = document.getElementById("Box");
    Box.appendChild(cancelButton);
    cancelButton.addEventListener("click", cancelButtonHandle);
  });
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    const input = {
      token: cookie,
    };
    checkAuth(input, cookie)
      .then((response) => {
        const data = response.data;
        if (data.role === "UNAUTHORIZED") {
          navigate("/signin");
          Cookies.remove("us");
        }
      })
      .catch(() => {
        navigate("/signin");
        Cookies.remove("us");
      });
  });
  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">DoB</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="right">Faculty</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.account_username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.account_name}
                </TableCell>
                <TableCell align="right">{row.account_password}</TableCell>
                <TableCell align="right">{row.account_id}</TableCell>
                <TableCell align="right">{row.account_name}</TableCell>
                <TableCell align="right">{row.account_dob}</TableCell>
                <TableCell align="right">{row.account_department}</TableCell>
                <TableCell align="right">{row.account_faculty}</TableCell>
                <TableCell align="right">
                  <Button onClick={handleOpen}>Edit</Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <form>
                      <Box sx={{ ...style, width: 400 }}>
                        <h2 id="modal-title">Account Detailed Information</h2>
                        <p id="modal-description">
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account Username"
                            variant="filled"
                          ></TextField>
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account Name"
                            variant="filled"
                          ></TextField>
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account Password"
                            variant="filled"
                          ></TextField>
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account DoB"
                            variant="filled"
                          ></TextField>
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account Department"
                            variant="filled"
                          ></TextField>
                          <TextField
                            fullWidth={true}
                            margin="normal"
                            label="Account Faculty"
                            variant="filled"
                          ></TextField>
                        </p>
                        <Box>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} onChange={handleChange}>
                              <MenuItem value={10}>Active</MenuItem>
                              <MenuItem value={20}>Disabled</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Button variant="contained" onClick={Clicked}>
                          Update
                        </Button>
                        <Button id="cancelButton">Cancel</Button>
                      </Box>
                    </form>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
