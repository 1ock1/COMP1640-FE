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

import { useMediaQuery } from "@mui/material";

export const TopicListManager = ({ falcutyId, academicId }) => {
  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");

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
          <Alert severity="info" style={{ width: "100%" }}>
            No Data.
          </Alert>
        ) : (
          topicsList?.map((topic) => (
            <Link
              style={{ textDecoration: "none" }}
              to={"/manager/process/" + topic.id}
            >
              <Box mt={2}>
                <Paper elevation={2} style={{ padding: "20px 20px" }}>
                  <Box display="flex" >
                    <TipsAndUpdatesIcon
                      sx={{ fontSize: matches576 ? 50 : 80 , marginRight: matches576 ? 3 : 4}}
                    />
                    <Box>
                      <Typography fontWeight={600}>{topic.name}</Typography>
                      <div style={{display:"flex", flexWrap:"wrap", width:"10rem"}}>
                      <Typography >Pending: {topic.pending}</Typography>
                      <Typography marginLeft={".8rem"}>Editted: {topic.editted}</Typography>
                      <Typography>Published: {topic.published}</Typography>
                      </div>
                      
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
