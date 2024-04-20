import * as React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import { checkAuth } from "../../../actions/UserActions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";

const AcademicPage = () => {
  const navigate = useNavigate();
  const [academicYears, setAcademicYears] = useState([]);
  const [addMode, setAddMode] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [entriDate, setEntriDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
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
  useEffect(() => {
    axios
      .get(apiEndpointLocal + path.academic.getall)
      .then((response) => {
        setAcademicYears(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  const handleEtriDatesChange = (entriDate) => {
    let date = new Date(entriDate);
    let dateEnd = new Date(endDate);
    if (dateEnd < date || dateEnd === date) {
      alert("End date should be greater than start date");
      setEntriDate("");
    } else {
      setEntriDate(entriDate);
    }
  };
  const handleEndriDatesChange = (endDate) => {
    let date = new Date(entriDate);
    let dateEnd = new Date(endDate);
    if (dateEnd < date || dateEnd === date) {
      alert("End date should be greater than start date");
      setEndDate("");
    } else {
      setEndDate(endDate);
    }
  };

  const handleFill = () => {
    axios
      .post(apiEndpointLocal + path.academic.create, {
        startDate: entriDate,
        endDate: endDate,
      })
      .then((response) => {
        setAcademicYears([...academicYears, response.data]);
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleFillUpdate = (index) => {
    axios
      .put(apiEndpointLocal + path.academic.update + index, {
        startDate: entriDate,
        endDate: endDate,
      })
      .then((response) => {
        // setAcademicYears([...academicYears, response.data]);
        setAcademicYears(
          academicYears.map((item) =>
            item.id === index ? response.data : item
          )
        );
        setOpenDialog(false);
        setSelectedRow("");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(apiEndpointLocal + path.academic.delete + id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAcademicYears(academicYears.filter((item) => item.id !== id));
        setOpenDialog(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Button
          style={{ float: "right", margin: "1rem" }}
          variant="contained"
          color="primary"
          onClick={() => {
            setAddMode(true);
            setOpenDialog(true);
          }}
        >
          New Academic Year
        </Button>
        <TableContainer component={Paper}></TableContainer>
        <TableContainer component={Paper}>
          <Table maxWith="sm" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Start Academic</TableCell>
                <TableCell align="left">End Academic</TableCell>
                {/* <TableCell align="right">Year</TableCell> */}
                <TableCell
                  align="left"
                  sx={{
                    padding: "0 2rem",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {academicYears.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">
                    {row.startDate.toString().split("T")[0]}
                  </TableCell>
                  <TableCell align="left">
                    {row.endDate.toString().split("T")[0]}
                  </TableCell>
                  <TableCell align="left">
                    {
                      <EditIcon
                        onClick={() => {
                          setEntriDate(row.startDate.toString().split("T")[0]);
                          setEndDate(row.endDate.toString().split("T")[0]);
                          setSelectedRow(row.id);
                          setAddMode(false);
                          setOpenDialog(true);
                        }}
                      ></EditIcon>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog */}
        {addMode ? (
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm" //
            fullWidth={true}
          >
            <DialogTitle>Add New Academic Year</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To set new academic year, please enter the start and end date.
              </DialogContentText>
              <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                  sx={{ width: 251 }}
                  id="startDate"
                  margin="normal"
                  name="startDate"
                  label="Start Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={entriDate}
                  onChange={(e) => {
                    let entriDate = e.target.value;
                    handleEtriDatesChange(entriDate);
                  }}
                />

                <TextField
                  sx={{ width: 251 }}
                  id="endDate"
                  margin="normal"
                  name="endDate"
                  label="End Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => {
                    let endDate = e.target.value;
                    handleEndriDatesChange(endDate);
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={() => handleFill()}>Subscribe</Button>
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
            <DialogTitle>Update Academic Year</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To update academic year, please enter the start and end date.
              </DialogContentText>
              <Box display={"flex"} justifyContent={"space-between"}>
                <TextField
                  sx={{ width: 251 }}
                  id="startDate"
                  margin="normal"
                  name="startDate"
                  label="Start Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={entriDate}
                  onChange={(e) => {
                    let entriDate = e.target.value;
                    handleEtriDatesChange(entriDate);
                  }}
                />

                <TextField
                  sx={{ width: 251 }}
                  id="endDate"
                  margin="normal"
                  name="endDate"
                  label="End Date"
                  InputLabelProps={{ shrink: true, required: true }}
                  type="date"
                  fullWidth
                  value={endDate}
                  onChange={(e) => {
                    let endDate = e.target.value;
                    handleEndriDatesChange(endDate);
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={() => handleFillUpdate(selectedRow)}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </>
  );
};

export default AcademicPage;
