import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "../slices/weatherForecastSlice";
import userSlices from "../slices/userSlices";
import dashboardSlices from "../slices/dashboardSlices";
export default configureStore({
  reducer: {
    list: weatherForecastSlice,
    users: userSlices,
    dashboard: dashboardSlices,
  },
});
