import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
import { Dashboard } from "../pages/Dashboard";
import { Process } from "../pages/Process";
import { TopicManager } from "../pages/TopicManager";
import { DocumentManager } from "../pages/DocumentManager";
export const AppBarManager = () => {
  return (
    <>
      <Routes>
        <Route path="/manager" element={<Dashboard />} />
        <Route path="/manager/process" element={<Process />} />
        <Route path="/manager/process/:topicId" element={<TopicManager />} />
        <Route
          path="/manager/process/:topicId/:reportId"
          element={<DocumentManager />}
        />
      </Routes>
    </>
  );
};

export const AppLinkManager = () => {
  const NavLink = (
    <>
      {Options.manager?.map((obj, index) => (
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
