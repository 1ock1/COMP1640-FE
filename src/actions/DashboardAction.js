import {
  apiEndpointLocal,
  apiEndpointStaging,
  apiEndpointProduction,
  path,
} from "../helpers/apiEndpoints";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const api = apiEndpointStaging; //you need to change this apiEndpoint to your real localhost
export const getTotalContributionPerFacultyAndAcademic = createAsyncThunk(
  "dashboard/getTotalContributionPerFacultyAndAcademic",
  async (data) => {
    const repsone = await axios.post(api + path.report.totalContribution, data);
    return repsone.data;
  }
);

export const getSubmissionPercentage = createAsyncThunk(
  "dashboard/getSubmissionPercentage",
  async (data) => {
    const repsone = await axios.post(
      api + path.report.percentageSubmission,
      data
    );
    return repsone.data;
  }
);

export const getTopicsStatusList = createAsyncThunk(
  "dashboard/getTopicsStatusList",
  async (data) => {
    const repsone = await axios.post(api + path.report.topicsStatuses, data);
    return repsone.data;
  }
);

export const getTotalContributor = createAsyncThunk(
  "dashboard/getTotalContributor",
  async (data) => {
    const repsone = await axios.post(api + path.report.totalContributor, data);
    return repsone.data;
  }
);

export const getPublishedReportPercentage = createAsyncThunk(
  "dashboard/getPublishedReportPercentage",
  async (data) => {
    const repsone = await axios.post(
      api + path.report.percentagePublishedReport,
      data
    );
    return repsone.data;
  }
);

export const getCommentStatusOfTopic = createAsyncThunk(
  "dashboard/getCommentStatusOfTopic",
  async (data) => {
    const repsone = await axios.get(
      api + path.report.commentStatusOfTopic + data
    );
    return repsone.data;
  }
);
