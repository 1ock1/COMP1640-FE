import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import { backgroundColor } from "../../../helpers/constantColor";
import ArticleIcon from "@mui/icons-material/Article";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  apiEndpointLocal,
  apiFEEndpointLocal,
  path,
} from "../../../helpers/apiEndpoints";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { TermPolicy } from "../../../components/TermPolicy";
import { FormateDate } from "../../../helpers/utils";
import { sendEmail } from "../../../actions/EmailAction";
export const TopicStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAllowedTopic, setAllowedTopic] = React.useState(false);
  const [reportId, setReportId] = React.useState(-1);
  const [documentId, setDocumentId] = React.useState("");
  const [topicInfor, setTopicInfor] = React.useState({});
  const [isSubmmited, setSubmiited] = React.useState(false);
  const [buttonControl, setButtonControl] = React.useState();
  const [coordinatorInfor, setCoordinatorInfor] = React.useState({});
  const [topicDate, setTopicDate] = React.useState({
    entriesDate: "",
    finalDate: "",
  });
  const handleUpload = async (event) => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      navigate("/signin");
      return;
    }
    const decoded = jwtDecode(cookie);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "document");
    formData.append("studentId", decoded["usid"]);
    formData.append("topicId", id);
    await axios
      .post(apiEndpointLocal + path.file.upload, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (coordinatorInfor !== null) {
          const data = {
            to_coordinator_email: coordinatorInfor.email,
            topic_name: topicInfor.name,
            to_name: coordinatorInfor.name,
            url:
              apiFEEndpointLocal +
              "coordinator/topics/report/" +
              response.data.reportID,
          };
          sendEmail(data);
        }
        setDocumentId(response.data.guid);
        setReportId(response.data.reportID);
      });
  };
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      navigate("/signin");
      return;
    }
    const decoded = jwtDecode(cookie);
    const dataCheckTopicAllowed = {
      topicId: parseInt(id),
      falcutyId: decoded["falcutyId"],
    };
    axios
      .post(
        apiEndpointLocal + path.topic.checkIsTopicAllowed,
        dataCheckTopicAllowed
      )
      .then((rep) => {
        setAllowedTopic(rep.data);
      })
      .then((err) => console.log(err));
    const data = {
      studentId: decoded["usid"],
      topicId: id,
    };
    axios
      .post(apiEndpointLocal + path.students.checkIsSubmitted, data)
      .then((resp) => {
        if (resp.data !== -1) {
          setSubmiited(true);
          setReportId(resp.data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(apiEndpointLocal + path.students.getTopicId + id)
      .then((response) => setTopicInfor(response.data))
      .catch((err) => navigate("/"));
    const dataCoordinator = {
      falcutyId: parseInt(decoded["falcutyId"]),
      role: "COORDINATOR, GUEST",
    };
    axios
      .post(apiEndpointLocal + path.user.getCoordinatorInfor, dataCoordinator)
      .then((rep) => setCoordinatorInfor(rep.data));
  }, []);
  React.useEffect(() => {
    if (isSubmmited) {
      axios
        .post(apiEndpointLocal + path.students.getDocumentId + reportId)
        .then((rep) => {
          if (rep.data !== "-1") {
            setDocumentId(rep.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isSubmmited]);
  React.useEffect(() => {
    if (topicInfor !== undefined) {
      const dateFinal = new Date(topicInfor.finalDate);
      const formatFinal = FormateDate(dateFinal);
      const dateEntries = new Date(topicInfor.entriesDate);
      const formatEntries = FormateDate(dateEntries);
      const dateTopic = {
        ...topicDate,
        entriesDate: formatEntries,
        finalDate: formatFinal,
      };
      setTopicDate(dateTopic);
    }
    if (topicInfor !== undefined && isAllowedTopic === true) {
      const dateFinal = new Date(topicInfor.finalDate);
      const formatFinal = FormateDate(dateFinal);
      const dateEntries = new Date(topicInfor.entriesDate);
      const formatEntries = FormateDate(dateEntries);
      const currentDate = new Date();
      const dateTopic = {
        ...topicDate,
        entriesDate: formatEntries,
        finalDate: formatFinal,
      };
      setTopicDate(dateTopic);
      if (currentDate > dateEntries && documentId === "") {
        setButtonControl(
          <Box>
            <Alert
              severity="error"
              style={{ textAlign: "center", padding: "15px 10px" }}
            >
              <Typography>
                You are out of date to submit to this topic
              </Typography>
            </Alert>
          </Box>
        );
      } else if (currentDate < dateEntries && documentId === "") {
        setButtonControl(
          <Box display="flex" width="200px" justifyContent="space-between">
            <Button variant="outlined" size="large">
              Back
            </Button>
            <TermPolicy handleUpload={handleUpload} />
          </Box>
        );
      } else if (documentId !== "") {
        setButtonControl(
          <Box
            display="flex"
            width="250px"
            justifyContent="space-between"
            margin="20px 0"
          >
            <Link
              style={{ textDecoration: "none" }}
              to={
                "/student/topics/" +
                id +
                "/report/" +
                reportId +
                "/" +
                documentId
              }
            >
              <Button
                variant="outlined"
                size="large"
                style={{ backgroundColor: backgroundColor, color: "white" }}
              >
                View Submission
              </Button>
            </Link>
          </Box>
        );
      }
    }
  }, [topicInfor, documentId, isAllowedTopic]);

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
            Entries Date: {topicDate?.entriesDate}
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
      {buttonControl}
      <Box padding="20px 0px">
        <Typography variant="h5" color={backgroundColor} fontWeight={600}>
          Published Report
        </Typography>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/student/topics/reportID">
          <Box mt={2}>
            <Paper elevation={2} style={{ padding: "20px 20px" }}>
              <Box display="flex">
                <ArticleIcon sx={{ fontSize: 80 }} />
                <Box>
                  <Typography>Tittle Name</Typography>
                  <Typography>Description</Typography>
                  <Typography>Student Name</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Link>
        <Alert
          severity="warning"
          style={{
            textAlign: "center",
            padding: "15px 10px",
            margin: "15px 0",
          }}
        >
          <Typography>There are no published report right here.</Typography>
        </Alert>
      </Box>
    </Container>
  );
};
