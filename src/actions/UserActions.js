import {
  apiEndpointLocal,
  apiEndpointStaging,
  apiEndpointProduction,
  path,
} from "../helpers/apiEndpoints";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import Cookies from "universal-cookie";
const api = apiEndpointLocal; //you need to change this apiEndpoint to your real localhost
export const login = createAsyncThunk("users/login", async (data) => {
  const repsone = await axios.post(api + path.user.login, data, {
    withCredentials: true,
  });
  Cookies.set("us", repsone.data["jwt"], { sameSite: "Strict", secure: true });
  return repsone.data;
});

export const loginSelectedRole = createAsyncThunk(
  "users/loginSelectedRole",
  async (data) => {
    const repsone = await axios.post(
      api + path.user.loginAsSelectedRole,
      data,
      {
        withCredentials: true,
      }
    );
    Cookies.set("us", repsone.data["jwt"], {
      sameSite: "Strict",
      secure: true,
    });
    return repsone.data;
  }
);

export const checkMultipleRole = (data) => {
  return axios.post(api + path.user.isMultipleRole, data, {
    withCredentials: true,
  });
};

export const signup = createAsyncThunk("users/signup", async (data) => {
  const repsone = await axios.post(api + path.user.signup, data);
  return repsone.data;
});

export const checkAuth = (input, cookie) => {
  return axios.post(api + path.user.authRole, input, {
    headers: {
      Authorization: `Bearer ` + cookie,
    },
  });
};
