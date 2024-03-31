import React from "react";
import axios from "axios";
import { FormateDate } from "../../../helpers/utils";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import {
  Container,
  FormControl,
  NativeSelect,
  Typography,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { reportStatus } from "../../../helpers/contanst";
import { ListReport } from "../../../components/ListReport";
export const TopicCoordinatorList = () => {
  const navigate = useNavigate();
  const [academics, setAcademics] = React.useState(undefined);
  const [topics, setTopics] = React.useState(undefined);
  const [reports, setReports] = React.useState(undefined);
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  const [selectedTopic, setSelectedTopic] = React.useState(-1);
  const [selectStatus, setSelectedStatus] = React.useState("Pending");
  React.useEffect(() => {
    axios.get(apiEndpointStaging + path.academic.getall).then((rep) => {
      setAcademics(rep.data);
      setSelectedAcademic(rep.data[0]?.id);
    });
  }, []);
  React.useEffect(() => {
    if (selectedAcademic !== -1) {
      const cookie = Cookies.get("us");
      if (cookie === undefined) {
        navigate("/signin");
        return;
      }
      const decoded = jwtDecode(cookie);
      const data = {
        academicId: selectedAcademic,
        falcutyId: parseInt(decoded["falcutyId"]),
      };
      axios
        .post(apiEndpointStaging + path.students.topics, data)
        .then((response) => {
          setTopics(response.data);
          setSelectedTopic(response.data[0]?.id);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedAcademic]);
  React.useEffect(() => {
    const data = {
      topicId: selectedTopic,
      status: selectStatus,
    };
    axios
      .post(apiEndpointStaging + path.report.getReportBaseStatus, data)
      .then((response) => {
        setReports(response.data);
      });
  }, [selectedTopic, selectStatus, selectedAcademic]);
  return (
    <>
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <Box>
          <FormControl style={{ width: 250 }}>
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
          <FormControl style={{ width: 250 }}>
            <Typography variant="h8">Topic</Typography>
            <NativeSelect
              defaultChecked={selectedTopic}
              onChange={(event) => setSelectedTopic(event.target.value)}
            >
              {topics?.map((obj, index) => {
                return (
                  <option key={index} value={obj.id}>
                    {obj.name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl style={{ width: 250 }}>
            <Typography variant="h8">Report Status</Typography>
            <NativeSelect
              defaultChecked={selectStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              {reportStatus?.map((obj, index) => {
                return (
                  <option key={index} value={obj}>
                    {obj}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
        </Box>
        <ListReport reports={reports} />
      </Container>
    </>
  );
};
