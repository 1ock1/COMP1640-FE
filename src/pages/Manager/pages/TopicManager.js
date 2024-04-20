import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import { checkAuth } from "../../../actions/UserActions";
import { FormateDate } from "../../../helpers/utils";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { backgroundColor } from "../../../helpers/constantColor";
import ArticleIcon from "@mui/icons-material/Article";
import {
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  Step,
  Stepper,
  StepLabel,
  Alert,
  FormControl,
  NativeSelect,
} from "@mui/material";
import { reportStatus, steps } from "../../../helpers/contanst";
export const TopicManager = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [topicInfor, setTopicInfor] = React.useState({});
  const [topicDate, setTopicDate] = React.useState({});
  const [selectStatus, setSelectedStatus] = React.useState(reportStatus[0]);
  const [reports, setReports] = React.useState(undefined);
  const [activeStep, setActiveStep] = React.useState(-1);
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
  React.useEffect(() => {
    axios
      .get(apiEndpointStaging + path.students.getTopicId + topicId)
      .then((response) => {
        const data = response.data;
        setTopicInfor(data);
        const dateFinal = new Date(data.finalDate);
        const formatFinal = FormateDate(dateFinal);
        const dateEntries = new Date(data.entriesDate);
        const formatEntries = FormateDate(dateEntries);
        const dateTopic = {
          ...topicDate,
          entriesDate: formatEntries,
          finalDate: formatFinal,
        };
        setTopicDate(dateTopic);
      })
      .catch((err) => navigate("/"));
  }, []);
  React.useEffect(() => {
    if (topicInfor !== null) {
      const data = {
        topicId: topicId,
        status: selectStatus,
      };
      axios
        .post(apiEndpointStaging + path.report.getReportBaseStatus, data)
        .then((response) => {
          console.log(response.data);
          setReports(response.data);
        });
    }
  }, [selectStatus, topicInfor]);
  React.useEffect(() => {
    if (topicInfor !== null) {
      console.log(topicInfor);
      const currentDate = new Date();
      const finalDate = new Date(topicInfor.finalDate);
      const entryDate = new Date(topicInfor.entriesDate);
      if (currentDate < finalDate) {
        setActiveStep(0);
      } else if (currentDate > entryDate && currentDate < finalDate) {
        setActiveStep(1);
      } else if (currentDate > finalDate) {
        setActiveStep(2);
      }
    }
  }, [topicInfor]);
  return (
    <Container maxWidth="xl">
      <Paper
        elevation={2}
        style={{
          margin: "20px 0px",
          padding: "0 25px",
        }}
      >
        <Typography padding="20px 0px" variant="h4" fontWeight={600}>
          Topic:{topicInfor.name}
        </Typography>
        <Box display="flex" pb={2}>
          <Typography paddingLeft={0.5} variant="h6" fontWeight={600}>
            Falcuty: Information Technology
          </Typography>
        </Box>
        <Divider></Divider>
        <Box mt={2}>
          <Typography variant="h7">
            Description: {topicInfor.description}
          </Typography>
        </Box>
        <Box display="flex" mt={2} pb={2}>
          <Typography variant="h6" color="#1565c0" fontWeight={600}>
            Entries Date:{topicDate?.entriesDate}
          </Typography>
          <Typography
            paddingLeft={15}
            variant="h6"
            color="#c62828"
            fontWeight={600}
          >
            Final Closure Date: {topicDate?.finalDate}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box padding="20px 0px">
        <Typography variant="h5" color={backgroundColor} fontWeight={600}>
          <FormControl style={{ width: 250, margin: "25px 0px" }}>
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
        </Typography>
        <Divider />
        <Box>
          {reports?.length === 0 ? (
            <Alert severity="info">No Data.</Alert>
          ) : (
            reports?.map((report) => (
              <Link
                style={{ textDecoration: "none" }}
                to={"/manager/process/" + topicId + "/" + report.reportId}
              >
                <Box mt={2}>
                  <Paper elevation={2} style={{ padding: "20px 20px" }}>
                    <Box display="flex">
                      <ArticleIcon sx={{ fontSize: 80 }} />
                      <Box>
                        <Typography>{report.reportId}</Typography>
                        <Typography>{report.name}</Typography>
                        <Typography>{report.lastDateComment}</Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Link>
            ))
          )}
        </Box>
      </Box>
    </Container>
  );
};
