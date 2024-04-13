import React from "react";
import { Box, CircularProgress, Paper, Typography, Alert } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTopicsStatusList } from "../../../actions/DashboardAction";
import {
  topicsStatusList,
  statusGetTopicStatusList,
} from "../../../slices/dashboardSlices";
export const TopicListManager = ({ falcutyId, academicId }) => {
  const dispatch = useDispatch();
  const topicsList = useSelector(topicsStatusList);
  const isGetTopicList = useSelector(statusGetTopicStatusList);
  React.useEffect(() => {
    const data = {
      academicId: academicId,
      facultyId: falcutyId,
    };
    console.log(data);
    dispatch(getTopicsStatusList(data));
  }, [falcutyId, academicId]);
  return (
    <>
      <Box>
        {isGetTopicList === false || topicsList.length === 0 ? (
          <Alert severity="info">No Data.</Alert>
        ) : (
          topicsList?.map((topic) => (
            <Link
              style={{ textDecoration: "none" }}
              to={"/manager/process/" + topic.id}
            >
              <Box mt={2}>
                <Paper elevation={2} style={{ padding: "20px 20px" }}>
                  <Box display="flex">
                    <TipsAndUpdatesIcon sx={{ fontSize: 80 }} />
                    <Box>
                      <Typography fontWeight={600}>{topic.name}</Typography>
                      <Typography>Pending: {topic.pending}</Typography>
                      <Typography>Editted: {topic.editted}</Typography>
                      <Typography>Published: {topic.published}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Link>
          ))
        )}
      </Box>
    </>
  );
};
