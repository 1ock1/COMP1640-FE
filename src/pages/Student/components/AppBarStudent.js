import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import { Options } from "../../../helpers/contanst";
export const AppBarStudent = () => {
  return (
    <>
      <Routes>
        <Route path="/student" element={<>heheSTUDENT</>} />
        <Route path="/student/infor" element={<>heheSTUDENTc</>} />
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
