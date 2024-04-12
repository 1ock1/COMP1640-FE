import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import Button from "@mui/material/Button";

import NativeSelect from "@mui/material/NativeSelect";
import { FormControl, InputLabel } from "@mui/material";


export const ListContributions = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  React.useEffect(() => {
    setTopics([
      { id: 1, name: "redux" },
      { id: 2, name: "html,css and more" },
    ]);
  }, []);

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection.selectionModel);
    console.log(newSelection);
  };

  // Sample data
  const rows = [
    { id: 1, name: "John", Title: "Redux save my life" },
    { id: 2, name: "Doe", Title: "Redux destroy my life" },
    { id: 3, name: "Minh", Title: "Redux give me money" },
    { id: 4, name: "Thai", Title: "Redux is ???" },
    { id: 5, name: "Thai", Title: "Redux is ???" },
    { id: 6, name: "Thai", Title: "Redux is ???" },
    { id: 7, name: "Thai", Title: "Redux is ???" },
    { id: 8, name: "Thai", Title: "Redux is ???" },
    { id: 9, name: "Thai", Title: "Redux is ???" },
    // Add more rows as needed
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "Title", headerName: "Title", width: 250 },
    // Add more columns as needed
  ];
  return (
    <>
      <Container minWidth="lg">
      <Box sx={{ margin: "1rem 0rem", width: "100%" }} align="left">
          <FormControl maxWidth="20%">
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Topic
            </InputLabel>
            <NativeSelect defaultValue={1}>
              {/* <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option> */}
              {topics.map((topic) => (
                <option value={topic.id}>{topic.name}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{ margin: "1rem 0rem" }} align="left">
          <div style={{ height: 470, width: "100%" }}>
            <DataGrid
            rowHeight={72}
              rows={rows}
              columns={columns}
              checkboxSelection
              onRowSelectionModelChange={handleSelectionChange}

              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </Box>

        <Box sx={{ margin: "0.5rem 0rem" }} align="left">
        <Button variant="contained">DownLoad </Button>
        </Box>
      </Container>
    </>
  );
};
