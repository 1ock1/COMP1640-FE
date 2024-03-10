import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "../slices/weatherForecastSlice";
export default configureStore({
  reducer: {
    list: weatherForecastSlice,
  },
});
