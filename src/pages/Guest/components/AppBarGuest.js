import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
import { GuestHomePage } from "../pages/Home";
export const AppBarGuest = () => {
  return (
    <>
      <Routes>
        <Route path="/guest" element={<GuestHomePage />} />
      </Routes>
    </>
  );
};

export const AppLinkGuest = () => {
  const NavLink = (
    <>
      {Options.guest?.map((obj, index) => (
        <Link
          key={index}
          to={obj.link}
          className="nav_header-link"
          style={{
            textDecoration: "none",
            color: "white",
            padding: 10,
          }}
        >
          {obj.value}
        </Link>
      ))}
    </>
  );
  return NavLink;
};
