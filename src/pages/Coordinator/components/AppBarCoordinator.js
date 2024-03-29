import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
import CoordinatorDashboard from "../pages/Dashboard";
import { TopicCoordinatorList } from "../pages/TopicCoordinatorList";
export const AppBarCoordinator = () => {
  return (
    <>
      <Routes>
        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/coordinator/topics" element={<TopicCoordinatorList />} />
      </Routes>
    </>
  );
};

export const AppLinkCoordinator = () => {
  const NavLink = (
    <>
      {Options.coordinator?.map((obj, index) => (
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
