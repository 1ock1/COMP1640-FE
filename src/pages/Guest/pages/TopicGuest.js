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
export const TopicStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAllowedTopic, setAllowedTopic] = React.useState(false);
  const [reportId, setReportId] = React.useState(-1);
  const [documentId, setDocumentId] = React.useState("");
  const [topicInfor, setTopicInfor] = React.useState({});

  const TopicPage = async (event) => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      navigate("/signin");
      return;
    }
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "document");
    formData.append("topicId", id);

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
    }
}