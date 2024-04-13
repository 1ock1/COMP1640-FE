import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../actions/UserActions";
export const HomePage = ({ auth }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    const input = {
      token: cookie,
    };
    checkAuth(input, cookie)
      .then((response) => {
        const data = response.data;
        if (data.role === "UNAUTHORIZED") {
          navigate("/signin");
          Cookies.remove("us");
        }
      })
      .catch(() => {
        navigate("/signin");
        Cookies.remove("us");
      });
  });
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

  return <></>;
};
