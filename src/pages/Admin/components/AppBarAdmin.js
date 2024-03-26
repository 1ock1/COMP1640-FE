import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import CreateAccount from "../../Authen/CreateAccount";
import { Options } from "../../../helpers/contanst";
import Dashboard from "../pages/Dashboard";
import TopicManagementPage from "../pages/TopicPage";
import FacultyManagementPage from "../pages/FalcutyPage";
import AccountManagementPage from "../pages/AccountManagementPage";
import AcademicPage from "../pages/AcademicPage";
export const AppBarAdmin = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/signup" element={<CreateAccount />} />
        <Route path="/admin/accounts" element={<AccountManagementPage />} />
        <Route path="/admin/falcuty" element={<FacultyManagementPage />} />
        <Route path="/admin/topics" element={<TopicManagementPage />} />
        <Route path="/admin/academics" element={<AcademicPage />} />
      </Routes>
    </>
  );
};

export const AppLinkAdmin = () => {
  const NavLink = (
    <>
      {Options.admin?.map((obj, index) => (
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
