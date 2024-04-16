import * as React from "react";
import axios from "axios";
import { FormateDate } from "../../../helpers/utils";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";

import { FormControl } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { TopicListManager } from "../components/TopicListManager";
import { useMediaQuery } from "@mui/material";
export const Process = () => {
  const [academics, setAcademics] = React.useState(undefined);
  const matches720 = useMediaQuery("(max-width:720px)");
  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  const [faculties, setFalcuties] = React.useState(undefined);
  const [selectedFaculties, setSelectedFaculties] = React.useState(-1);
  React.useEffect(() => {
    axios.get(apiEndpointStaging + path.academic.getall).then((rep) => {
      setAcademics(rep.data);
      setSelectedAcademic(rep.data[0]?.id);
    });
    axios.get(apiEndpointStaging + path.falcuty.getall).then((rep) => {
      setFalcuties(rep.data);
      setSelectedFaculties(rep.data[0]?.id);
    });
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ margin: "3rem 0rem", width: "100%" }} align="left">
          <FormControl
            style={{ width: matches720 ? "100%" : 250, marginBottom: 10 }}
          >
            <Typography variant="h8">Academic Year</Typography>
            <NativeSelect
              defaultChecked={selectedAcademic}
              onChange={(event) => {
                setSelectedAcademic(event.target.value);
              }}
            >
              {academics?.map((obj, index) => {
                const startDate = new Date(obj.startDate);
                const startDateFormatted = FormateDate(startDate);
                const endDate = new Date(obj.endDate);
                const endDateFormatted = FormateDate(endDate);
                return (
                  <option key={index} value={obj.id}>
                    {startDateFormatted + " - " + endDateFormatted}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl
            style={{ width: matches720 ? "100%" : 250, marginBottom: 10 }}
          >
            <Typography variant="h8">Faculties</Typography>
            <NativeSelect
              defaultChecked={selectedFaculties}
              onChange={(event) => setSelectedFaculties(event.target.value)}
            >
              {faculties?.map((obj, index) => {
                return (
                  <option key={index} value={obj.id}>
                    {obj.name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </Box>
        <Box sx={{ margin: "3rem 0rem 0rem 0rem", width: "90%" }} align="left">
          <TopicListManager
            falcutyId={parseInt(selectedFaculties)}
            academicId={parseInt(selectedAcademic)}
          />
        </Box>
        <Box
          sx={{ margin: "1rem 0rem 3rem 0rem", width: "90%" }}
          align="center"
        >
          {/* <Stack spacing={2} align="center">
            <Pagination count={5} variant="outlined" color="primary" />
          </Stack> */}
        </Box>
      </Container>
    </>
  );
};
