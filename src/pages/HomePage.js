import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const HomePage = ({ auth }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    try {
      const cookie = Cookies.get("us");
      if (cookie === undefined) {
        navigate("/signin");
        return;
      }
      const decoded = jwtDecode(cookie);
      if (decoded["role"] === auth.role) {
        navigate("/" + auth.role.toLowerCase());
      }
    } catch (err) {
      navigate("/signin");
    }
  }, [auth]);

  return <>THIS IS HOME PAGE AND YOU NEED TO DESIGN IT</>;
};
