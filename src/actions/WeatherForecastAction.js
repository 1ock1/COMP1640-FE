import {
  apiEndpointLocal,
  apiEndpointStaging,
  apiEndpointProduction,
  path,
} from "../helpers/apiEndpoints";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const api = apiEndpointLocal; //you need to change this apiEndpoint to your real localhost
export const getWeatherForecast = createAsyncThunk(
  "list/getWeatherForecast",
  async () => {
    const repsone = await axios.get(api + path.WeatherForecast);
    return repsone.data;
  }
);
