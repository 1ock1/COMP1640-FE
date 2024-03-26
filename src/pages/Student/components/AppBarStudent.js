import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
import { DocumentStudent } from "../pages/DocumentStudent";
import { TopicStudent } from "../pages/TopicStudent";
import { TopicList } from "../pages/TopicList";
import UnAuthorized from "../../Unauthorized";
export const AppBarStudent = () => {
  return (
    <>
      <Routes>
        <Route
          path="student"
          element={
            <>
              <TopicList />
            </>
          }
        />
        <Route path="/student/topics/:id" element={<TopicStudent />} />
        <Route
          path="/student/topics/:id/report/:reportId/:fileId"
          element={<DocumentStudent />}
        />
        {/* <Route path="*" element={<UnAuthorized />} /> */}
      </Routes>
    </>
  );
};

export const AppLinkStudent = () => {
  const NavLink = (
    <>
      {Options.student?.map((obj, index) => (
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
