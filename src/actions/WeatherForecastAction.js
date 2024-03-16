import {
  apiEndpointLocal,
  apiEndpointStaging,
  apiEndpointProduction,
  path,
} from "../helpers/apiEndpoints";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const api = apiEndpointLocal; //you need to change this apiEndpoint to your real localhost
export const getWeatherForecast = createAsyncThunk(
  "list/getWeatherForecast",
  async () => {
    const myCookieValue = Cookies.get("us");
    const repsone = await axios.get(api + path.WeatherForecast, {
      headers: {
        Authorization: `Bearer ` + myCookieValue,
      },
    });
    return repsone.data;
  }
);
