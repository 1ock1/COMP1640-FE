import { createSlice } from "@reduxjs/toolkit";
import {
  getTotalContributionPerFacultyAndAcademic,
  getSubmissionPercentage,
  getTopicsStatusList,
  getTotalContributor,
  getPublishedReportPercentage,
  getCommentStatusOfTopic,
} from "../actions/DashboardAction";

export const Dashboard = createSlice({
  name: "dashboard",
  initialState: {
    totalContribution: 0,
    totalContributor: 0,
    submissionPercentage: 0,
    publishedReportPercentage: 0,
    commentStatus: {},
    topicsStatusList: [],
    statusCommentStatus: false,
    statusTotalContribution: false,
    statusGetSubmissionPercentage: false,
    statusGetTopicStatusList: false,
    statusTotalContributor: false,
    statusPublishedReportPercentage: false,
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //GET TOTAL CONTRIBUTION
    builder
      .addCase(getTotalContributionPerFacultyAndAcademic.pending, (state) => {
        state.statusTotalContribution = false;
      })
      .addCase(
        getTotalContributionPerFacultyAndAcademic.fulfilled,
        (state, action) => {
          state.statusTotalContribution = true;
          state.totalContribution = action.payload;
        }
      )
      .addCase(
        getTotalContributionPerFacultyAndAcademic.rejected,
        (state, action) => {
          state.statusTotalContribution = false;
          state.error = action.error.message;
        }
      );

    //GET PERCENTAGE SUBMISSION
    builder
      .addCase(getSubmissionPercentage.pending, (state) => {
        state.statusGetSubmissionPercentage = false;
      })
      .addCase(getSubmissionPercentage.fulfilled, (state, action) => {
        state.statusGetSubmissionPercentage = true;
        state.submissionPercentage = action.payload;
      })
      .addCase(getSubmissionPercentage.rejected, (state, action) => {
        state.statusGetSubmissionPercentage = false;
        state.error = action.error.message;
      });

    //GET Topics Status List
    builder
      .addCase(getTopicsStatusList.pending, (state) => {
        state.statusGetTopicStatusList = false;
      })
      .addCase(getTopicsStatusList.fulfilled, (state, action) => {
        state.statusGetTopicStatusList = true;
        state.topicsStatusList = action.payload;
      })
      .addCase(getTopicsStatusList.rejected, (state, action) => {
        state.statusGetTopicStatusList = false;
        state.error = action.error.message;
      });

    //GET Total Contributor
    builder
      .addCase(getTotalContributor.pending, (state) => {
        state.statusTotalContributor = false;
      })
      .addCase(getTotalContributor.fulfilled, (state, action) => {
        state.statusTotalContributor = true;
        state.totalContributor = action.payload;
      })
      .addCase(getTotalContributor.rejected, (state, action) => {
        state.statusTotalContributor = false;
        state.error = action.error.message;
      });
    //GET published report percentage
    builder
      .addCase(getPublishedReportPercentage.pending, (state) => {
        state.statusPublishedReportPercentage = false;
      })
      .addCase(getPublishedReportPercentage.fulfilled, (state, action) => {
        state.statusPublishedReportPercentage = true;
        state.publishedReportPercentage = action.payload;
      })
      .addCase(getPublishedReportPercentage.rejected, (state, action) => {
        state.statusPublishedReportPercentage = false;
        state.error = action.error.message;
      });

    //GET Comment Status of topic
    builder
      .addCase(getCommentStatusOfTopic.pending, (state) => {
        state.statusCommentStatus = false;
      })
      .addCase(getCommentStatusOfTopic.fulfilled, (state, action) => {
        state.statusCommentStatus = true;
        state.commentStatus = action.payload;
      })
      .addCase(getCommentStatusOfTopic.rejected, (state, action) => {
        state.statusCommentStatus = false;
        state.error = action.error.message;
      });
  },
});

export const totalContribution = (state) => state.dashboard.totalContribution;
export const statusTotalContribution = (state) =>
  state.dashboard.statusTotalContribution;

export const submissionPercentage = (state) =>
  state.dashboard.submissionPercentage;
export const statusGetSubmissionPercentage = (state) =>
  state.dashboard.statusGetSubmissionPercentage;

export const topicsStatusList = (state) => state.dashboard.topicsStatusList;
export const statusGetTopicStatusList = (state) =>
  state.dashboard.statusGetTopicStatusList;

export const totalContributor = (state) => state.dashboard.totalContributor;
export const statusGetTotalContributor = (state) =>
  state.dashboard.statusTotalContributor;

export const publishedReportPercentage = (state) =>
  state.dashboard.publishedReportPercentage;
export const statusGetPublishedReportPercentage = (state) =>
  state.dashboard.statusPublishedReportPercentage;

export const commentStatus = (state) => state.dashboard.commentStatus;
export const statusCommentStatus = (state) =>
  state.dashboard.statusCommentStatus;

export default Dashboard.reducer;
