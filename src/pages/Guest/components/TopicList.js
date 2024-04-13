import React from "react";
import axios from "axios";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
import { Box, Paper, Typography } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export const TopicTabPanelList = ({ falcutyId, academicId }) => {
  const [topics, setTopics] = React.useState(undefined);
  React.useEffect(() => {
    const data = {
      academicId: academicId,
      falcutyId: falcutyId,
    };
    axios
      .post(apiEndpointStaging + path.students.topics, data)
      .then((response) => setTopics(response.data))
      .catch((err) => console.log(err));
  }, [falcutyId, academicId]);
  return (
    <Box>
      {topics === undefined && <CircularProgress />}
      {topics?.map((topic) => (
        <Link
          style={{ textDecoration: "none" }}
          to={"/student/topics/" + topic.id}
        >
          <Box mt={2}>
            <Paper elevation={2} style={{ padding: "20px 20px" }}>
              <Box display="flex">
                <TipsAndUpdatesIcon sx={{ fontSize: 80 }} />
                <Box>
                  <Typography fontWeight={600}>{topic.name}</Typography>
                  <Typography>{topic.description}</Typography>
                  <Typography>{topic.finalDate}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Link>
      ))}
    </Box>
  );
};
