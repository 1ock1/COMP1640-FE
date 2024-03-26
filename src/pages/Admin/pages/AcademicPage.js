import * as React from "react";

import { useEffect, useState } from "react";
import axios from "axios";

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
} from "@mui/material";

const AcademicPage = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7044/api/Academic")
      .then((response) => {
        setAcademicYears(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // console.log(academicYears.startDate.getFullYear());

  return (
    <>
      <Container maxWidth="lg">
        <Button
          style={{float: 'right', margin: "1rem"}}
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
                <TableCell >ID</TableCell>
                <TableCell align="left" >Start Academic</TableCell>
                <TableCell align="left">End Academic</TableCell>
                {/* <TableCell align="right">Year</TableCell> */}
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
                  {/* <TableCell align="right">{row.startDate.year()}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AcademicPage;
