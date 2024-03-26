import React from "react";
import axios from "axios";
import { apiEndpointStaging, path } from "../../helpers/apiEndpoints";
import { Box, Paper, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export const TopicTabPanelList = () => {
  const [topics, setTopics] = React.useState(undefined);
  React.useEffect(() => {
    axios
      .get(apiEndpointStaging + path.students.topics)
      .then((response) => setTopics(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {topics === undefined && <CircularProgress />}
      {topics?.map((topic) => (
        <Link
          style={{ textDecoration: "none" }}
          to={"/student/topics/" + topic.id}
        >
          <Box mt={2}>
            <Paper elevation={2} style={{ padding: "20px 20px" }}>
              <Box display="flex">
                <ArticleIcon sx={{ fontSize: 80 }} />
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
    </>
  );
};
