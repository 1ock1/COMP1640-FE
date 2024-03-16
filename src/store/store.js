import { configureStore } from "@reduxjs/toolkit";
import weatherForecastSlice from "../slices/weatherForecastSlice";
import userSlices from "../slices/userSlices";
export default configureStore({
  reducer: {
    list: weatherForecastSlice,
    users: userSlices,
  },
});
