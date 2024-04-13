import { createSlice } from "@reduxjs/toolkit";
import {
  getTotalContributionPerFacultyAndAcademic,
  getSubmissionPercentage,
  getTopicsStatusList,
} from "../actions/DashboardAction";

export const Dashboard = createSlice({
  name: "dashboard",
  initialState: {
    totalContribution: 0,
    submissionPercentage: 0,
    topicsStatusList: [],
    statusTotalContribution: false,
    statusGetSubmissionPercentage: false,
    statusGetTopicStatusList: false,
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

export default Dashboard.reducer;
