import { createSlice } from "@reduxjs/toolkit";
import { authRole, login } from "../actions/UserActions";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const builderCase = (builder, func) => {
  builder
    .addCase(func.pending, (state) => {
      state.status = "loading";
    })
    .addCase(func.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    })
    .addCase(func.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};

export const User = createSlice({
  name: "users",
  initialState: {
    isStatusLogin: "",
    loginResult: {},
    role: "",
    messageStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    //get all weatherforcast
    builder
      .addCase(login.pending, (state) => {
        state.isStatusLogin = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isStatusLogin = "succeeded";
        state.loginResult = action.payload;
        state.messageStatus = "Login Successfully";
        const cookie = Cookies.get("us");
        const decoded = jwtDecode(cookie);
        state.role = decoded["role"];
      })
      .addCase(login.rejected, (state, action) => {
        state.isStatusLogin = "failed";
        state.messageStatus = "Email or password is wrong";
        state.error = action.error.message;
      });
  },
});

export const loginResult = (state) => state.users.loginResult;
export const isStatusLogin = (state) => state.users.isStatusLogin;
export const role = (state) => state.users.role;
export const messageStatus = (state) => state.users.messageStatus;
export default User.reducer;
