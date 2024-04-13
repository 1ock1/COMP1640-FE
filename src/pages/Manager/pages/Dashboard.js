import axios from "axios";
import React from "react";
import { apiEndpointStaging, path } from "../../../helpers/apiEndpoints";
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
} from "../../../slices/dashboardSlices";
import {
  getSubmissionPercentage,
  getTopicsStatusList,
  getTotalContributionPerFacultyAndAcademic,
} from "../../../actions/DashboardAction";
export const Dashboard = () => {
  const dispatch = useDispatch();
  const totalReport = useSelector(totalContribution);
  const isLoadingTotalReport = useSelector(statusTotalContribution);
  const percentageSubmission = useSelector(submissionPercentage);
  const isGetSubmissionPercentage = useSelector(statusGetSubmissionPercentage);
  const topicsList = useSelector(topicsStatusList);
  const isGetTopicList = useSelector(statusGetTopicStatusList);

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
  React.useEffect(() => {
    axios.get(apiEndpointStaging + path.academic.getall).then((rep) => {
      setAcademics(rep.data);
      setSelectedAcademic(rep.data[0]?.id);
    });
    axios.get(apiEndpointStaging + path.falcuty.getall).then((rep) => {
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
    }
  }, [selectedAcademic, selectedFaculties]);
  console.log(Array.from(barChart?.pending));
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
      setBarChartData(barChartResult);
    }
  }, [isGetTopicList]);
  console.log(barChart);
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ margin: "1rem 0rem" }}>
          <FormControl style={{ width: 250, marginRight: 15 }}>
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
        </Box>
        <Box
          sx={{ margin: "0rem" }}
          display={"flex"}
          fullWidth
          minHeight={250}
          justifyContent={"space-between"}
        >
          <Grid container spacing={0}>
            <Grid item xs={9}>
              <Box
                sx={{ margin: "2rem 0rem" }}
                display={"flex"}
                justifyContent="space-between"
              >
                <Card
                  style={{
                    width: "20%",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Total contributions
                    </Typography>

                    <Typography sx={{ fontSize: 16 }} color="text.primary">
                      {isLoadingTotalReport ? (
                        totalReport
                      ) : (
                        <Skeleton animation="wave" />
                      )}
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: "20%",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Submission rate
                    </Typography>

                    <Typography sx={{ fontSize: 16 }} color="text.primary">
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
                    width: "20%",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Total published
                    </Typography>

                    <Typography sx={{ fontSize: 16 }} color="text.primary">
                      5
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  style={{
                    width: "20%",
                  }}
                >
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 18 }}
                      color="text.primary"
                      gutterBottom
                    >
                      Published rate
                    </Typography>

                    <Typography sx={{ fontSize: 16 }} color="text.primary">
                      205
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={9}>
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
                  height={500}
                />
              ) : (
                <Alert severity="info">No Data.</Alert>
              )}
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
                Summary of contributions
              </Typography>
              <Box mt={2}>
                <Typography>Pending Reports: </Typography>
                <Typography>Edited Reports: </Typography>
                <Typography>Exception Reports: </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
