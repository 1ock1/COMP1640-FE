import { createSlice } from "@reduxjs/toolkit";
import { getWeatherForecast } from "../actions/WeatherForecastAction";
const builderCase = (builder, func) => {
  builder
    .addCase(func.pending, (state) => {
      state.status = "loading";
    })
    .addCase(func.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.weatherForecast = action.payload;
    })
    .addCase(func.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const WeatherForecast = createSlice({
  name: "weatherForecast",
  initialState: {
    weatherForecast: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //get all weatherforcast
    builderCase(builder, getWeatherForecast);
  },
});

export const listWeatherForecast = (state) => state.list.weatherForecast;
export const isLoading = (state) => state.list.status;
export default WeatherForecast.reducer;
