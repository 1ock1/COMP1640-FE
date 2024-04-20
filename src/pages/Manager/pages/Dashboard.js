import axios from "axios";
import React from "react";
import { apiEndpointLocal, path } from "../../../helpers/apiEndpoints";
import {
  Box,
  Container,
  FormControl,
  Typography,
  Card,
  CardContent,
  Grid,
  NativeSelect,
  Skeleton,
  Alert,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { FormateDate } from "../../../helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  totalContribution,
  statusTotalContribution,
  submissionPercentage,
  statusGetSubmissionPercentage,
  topicsStatusList,
  statusGetTopicStatusList,
  totalContributor,
  statusGetTotalContributor,
  publishedReportPercentage,
  statusGetPublishedReportPercentage,
  commentStatus,
} from "../../../slices/dashboardSlices";
import {
  getCommentStatusOfTopic,
  getPublishedReportPercentage,
  getSubmissionPercentage,
  getTopicsStatusList,
  getTotalContributionPerFacultyAndAcademic,
  getTotalContributor,
} from "../../../actions/DashboardAction";
import { useMediaQuery } from "@mui/material";
export const Dashboard = () => {
  // const matches720 = useMediaQuery("(max-width:720px)");
  const matches576 = useMediaQuery("(max-width:576px)");
  const matches880 = useMediaQuery("(max-width:880px)");
  const dispatch = useDispatch();
  const totalReport = useSelector(totalContribution);
  const isLoadingTotalReport = useSelector(statusTotalContribution);
  const percentageSubmission = useSelector(submissionPercentage);
  const isGetSubmissionPercentage = useSelector(statusGetSubmissionPercentage);
  const topicsList = useSelector(topicsStatusList);
  const isGetTopicList = useSelector(statusGetTopicStatusList);
  const numberContributor = useSelector(totalContributor);
  const isGetContributor = useSelector(statusGetTotalContributor);
  const percentagePublishedReport = useSelector(publishedReportPercentage);
  const isGetPublishedReportPercentage = useSelector(
    statusGetPublishedReportPercentage
  );
  const commentStatusObject = useSelector(commentStatus);

  const [barChart, setBarChartData] = React.useState({
    topicId: [],
    topicName: [],
    pending: [],
    editted: [],
    published: [],
  });
  const [academics, setAcademics] = React.useState(undefined);
  const [selectedAcademic, setSelectedAcademic] = React.useState(-1);
  const [faculties, setFalcuties] = React.useState(undefined);
  const [selectedFaculties, setSelectedFaculties] = React.useState(-1);
  const [selectedTopic, setSelectedTopic] = React.useState(-1);
  React.useEffect(() => {
    axios.get(apiEndpointLocal + path.academic.getall).then((rep) => {
      setAcademics(rep.data);
      setSelectedAcademic(rep.data[0]?.id);
    });
    axios.get(apiEndpointLocal + path.falcuty.getall).then((rep) => {
      setFalcuties(rep.data);
      setSelectedFaculties(rep.data[0]?.id);
    });
  }, []);
  React.useEffect(() => {
    if (selectedFaculties !== -1 && selectedAcademic !== -1) {
      const data = {
        academicId: selectedAcademic,
        facultyId: selectedFaculties,
      };
      dispatch(getTotalContributionPerFacultyAndAcademic(data));
      dispatch(getSubmissionPercentage(data));
      dispatch(getTopicsStatusList(data));
      dispatch(getTotalContributor(data));
      dispatch(getPublishedReportPercentage(data));
    }
  }, [selectedAcademic, selectedFaculties]);
  React.useEffect(() => {
    if (isGetTopicList === true) {
      const listId = [];
      const listName = [];
      const listPending = [];
      const listEditted = [];
      const listPublished = [];
      topicsList.map((obj) => {
        console.log(obj);
        listId.push(obj.id);
        listName.push(obj.name);
        listPending.push(obj.pending);
        listEditted.push(obj.editted);
        listPublished.push(obj.published);
      });
      const barChartResult = {
        ...barChart,
        topicId: listId,
        topicName: listName,
        pending: listPending,
        editted: listEditted,
        published: listPublished,
      };
      setSelectedTopic(listId[0]);
      setBarChartData(barChartResult);
    }
  }, [isGetTopicList]);
  React.useEffect(() => {
    if (selectedTopic !== -1) {
      dispatch(getCommentStatusOfTopic(selectedTopic));
    }
  }, [selectedTopic]);
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ margin: "1rem 0rem", width: matches576 ? ("100%"):(matches880 ? "70%" : "100%") }}>
          <FormControl
            style={{ width: matches880 ? "45%" : 250, marginBottom: 10 }}
          >
            <Typography variant="h8">Faculties</Typography>
            <NativeSelect
              defaultChecked={selectedFaculties}
              onChange={(event) => setSelectedFaculties(event.target.value)}
            >
              {faculties?.map((obj, index) => {
                return (
                  <option key={index} value={obj.id}>
                    {obj.name}
                  </option>
                );
              })}
            </NativeSelect>
          </FormControl>
          <FormControl
            style={{
              width: matches880 ? "40%" : 250,
              marginBottom: 10,
              marginLeft: "2rem",
            }}
          >
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
        </Box>
        <Box
          sx={{ margin: "0rem" }}
          display={"flex"}
          fullWidth
          minHeight={250}
          justifyContent={"space-between"}
        >
          <Grid container spacing={0}>
            <Grid item xs={matches576 ? 12 : matches880 ? 12 : 9}>
              <Box
                sx={{ margin: "2rem rem" }}
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
              >
                <Card
                  style={{
                    width: matches576 ? "48%" : matches880 ? "22%" : "24%",
                    marginBottom: 10,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{
                        fontSize: matches576 ? 16 : matches880 ? 16 : 18,
                      }}
                      color="text.primary"
                      gutterBottom
                    >
                      Total contributions
                    </Typography>

                    <Typography
                      sx={{ fontSize: matches576 ? 14 : matches880 ? 14 : 16 }}
                      color="text.primary"
                    >
                      {isLoadingTotalReport ? (
                        totalReport + " submissions"
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: matches576 ? "48%" : matches880 ? "22%" : "24%",
                    marginBottom: 10,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: matches576 ? 16 : matches880 ? 16 : 18, }}
                      color="text.primary"
                      gutterBottom
                    >
                      Total Contributor
                    </Typography>

                    <Typography sx={{ fontSize: matches576 ? 14 : matches880 ? 14 : 16 }} color="text.primary">
                      {isGetContributor ? (
                        numberContributor + " students"
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: matches576 ? "48%" : matches880 ? "22%" : "24%",
                    marginBottom: 10,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: matches576 ? 16 : matches880 ? 16 : 18, }}
                      color="text.primary"
                      gutterBottom
                    >
                      Submission rate
                    </Typography>

                    <Typography 
                   sx={{ fontSize: matches576 ? 14 : matches880 ? 14 : 16 }} color="text.primary">
                      {isGetSubmissionPercentage ? (
                        percentageSubmission + "%"
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: matches576 ? "48%" : matches880 ? "22%" : "24%",
                    marginBottom: 10,
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{fontSize: matches576 ? 16 : matches880 ? 16 : 18, }}
                      color="text.primary"
                      gutterBottom
                    >
                      Published rate
                    </Typography>

                    <Typography 
                    sx={{ fontSize: matches576 ? 14 : matches880 ? 14 : 16 }} color="text.primary">
                      {isGetPublishedReportPercentage ? (
                        percentagePublishedReport + "%"
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={matches880 ? 12 : 9}>
              {barChart?.topicId.length !== 0 ? (
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: Array.from(barChart?.topicName), //name
                    },
                  ]}
                  series={[
                    { data: Array.from(barChart?.pending), label: "Pending" },
                    { data: Array.from(barChart?.editted), label: "Editted" },
                    {
                      data: Array.from(barChart?.published),
                      label: "Published",
                    },
                  ]}
                  height={matches576 ? 250 : 400}
                />
              ) : (
                <Alert severity="info">No Data.</Alert>
              )}
            </Grid>
            <Grid item xs={matches880 ? 12 : 3}>
              {barChart?.topicId.length !== 0 ? (
                <Box mt={2}>
                  <Typography
                    sx={{ mt: 2, mb: 1 }}
                    variant="h6"
                    component="div"
                  >
                    Topic Statistic
                  </Typography>
                  <FormControl
                    style={{ width: 250, marginRight: 15, marginBottom: 15 }}
                  >
                    <NativeSelect
                      defaultChecked={selectedFaculties}
                      onChange={(event) => {
                        setSelectedTopic(event.target.value);
                      }}
                    >
                      {barChart?.topicId?.map((value, index) => {
                        return (
                          <option key={index} value={value}>
                            {barChart?.topicName[index]}
                          </option>
                        );
                      })}
                    </NativeSelect>
                  </FormControl>
                  <Typography fontWeight={600}>Exception Reports: </Typography>
                  <Typography display="flex" justifyContent="space-between">
                    Contribution Without Comment:
                    <strong style={{ color: "red" }}>
                      {commentStatusObject["notCommentReport"]} Contribution
                    </strong>
                  </Typography>
                  <Typography
                    display="flex"
                    justifyContent="space-between"
                    sx={{ marginBottom: "2.5rem" }}
                  >
                    Contribution With Comment:
                    <strong style={{ color: "green" }}>
                      {commentStatusObject["commentedReport"]} Contribution
                    </strong>
                  </Typography>
                </Box>
              ) : (
                <Alert severity="info">No Data.</Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
