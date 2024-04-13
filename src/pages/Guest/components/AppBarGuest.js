import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
import { GuestHomePage } from "../pages/Home";
import { TopicGuest } from "../pages/TopicGuest";
import { DashboardGuest } from "../pages/Dashboard";
export const AppBarGuest = () => {
  return (
    <>
      <Routes>
        <Route path="/guest" element={<GuestHomePage />} />
        <Route path="/guest/topic/:topicId" element={<TopicGuest />} />
        <Route path="/guest/dashboard" element={<DashboardGuest />} />
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
