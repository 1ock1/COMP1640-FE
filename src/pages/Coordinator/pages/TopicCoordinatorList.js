import React from "react";
import axios from "axios";
import { FormateDate } from "../../../helpers/utils";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import {
  Container,
  FormControl,
  NativeSelect,
  Typography,
  Box,
} from "@mui/material";
export const TopicCoordinatorList = () => {
  const [academics, setAcademics] = React.useState(undefined);
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  React.useEffect(() => {
    axios
      .get(apiEndpointLocal + path.academic.getall)
      .then((rep) => setAcademics(rep.data));
  }, []);
  console.log(academics);
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Box>
          <FormControl style={{ width: 250 }}>
            <Typography variant="h8">Academic Year</Typography>
            <NativeSelect
              defaultChecked={1}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
              onChange={(event) => setSelectedAcademic(event.target.value)}
            >
              {academics?.map((obj, index) => {
                console.log(obj);
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
        </Box>
      </Container>
    </>
  );
};
