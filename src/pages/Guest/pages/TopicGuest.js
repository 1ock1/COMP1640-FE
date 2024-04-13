import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import { backgroundColor } from "../../../helpers/constantColor";
import ArticleIcon from "@mui/icons-material/Article";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import { useNavigate } from "react-router-dom";
import { FormateDate } from "../../../helpers/utils";
export const TopicGuest = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [topicInfor, setTopicInfor] = React.useState({});
  const [topicDate, setTopicDate] = React.useState({});
  const [reports, setReports] = React.useState(undefined);
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
        status: "Published",
      };
      axios
        .post(apiEndpointStaging + path.report.getReportBaseStatus, data)
        .then((response) => {
          console.log(response.data);
          setReports(response.data);
        });
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
      <Box padding="20px 0px">
        <Typography variant="h5" color={backgroundColor} fontWeight={600}>
          Published Contribution
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
