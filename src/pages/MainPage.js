import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { backgroundColor } from "../helpers/constantColor";
import { Options } from "../helpers/contanst";
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { checkAuth } from "../actions/UserActions";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import SignIn from "./Authen/SignIn";
import { useMediaQuery } from "@mui/material";
import { AppLinkAdmin, AppBarAdmin } from "./Admin/components/AppBarAdmin";
import { DrawList } from "../components/DrawerList";
import { Footer } from "../components/Footer";
import UnAuthorized from "./Unauthorized";
import { role } from "../slices/userSlices";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  AppBarStudent,
  AppLinkStudent,
} from "./Student/components/AppBarStudent";
import { HomePage } from "./HomePage";
import { SignOut } from "./Authen/SignOut";
const MainPage = () => {
  const userRole = useSelector(role);
  const [open, setOpen] = React.useState(false);
  const [userTab, setUserTab] = React.useState(undefined);
  const [options, setOptions] = React.useState([]);
  const [auth, setAuth] = React.useState({});
  const [isSigned, setIsSigned] = React.useState(false);
  // const matches = useMediaQuery("(min-width:600px)");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    const input = {
      token: cookie,
    };
    checkAuth(input, cookie)
      .then((response) => {
        const data = response.data;
        setAuth(data);
        setUserTab(data.role);
        setOptions(Options[data.role.toLowerCase()]);
        if (data.role === "UNAUTHORIZED") {
          setIsSigned(false);
        } else {
          setIsSigned(true);
        }
      })
      .catch(() => setIsSigned(false));
  }, [userRole]);
  return (
    <>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{ backgroundColor: backgroundColor }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {userTab === "STUDENT" ? (
                  <AppLinkStudent />
                ) : userTab === "ADMIN" ? (
                  <AppLinkAdmin />
                ) : (
                  ""
                )}
              </Typography>
              {!isSigned && (
                <Button style={{ backgroundColor: "#2cc302" }}>
                  {" "}
                  <Link
                    to="/signin"
                    className="nav_header-link"
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    Sign In
                  </Link>
                </Button>
              )}
              {isSigned && (
                <SignOut
                  setUserTab={setUserTab}
                  setIsSigned={setIsSigned}
                  setOptions={setOptions}
                />
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer}>
          <DrawList
            toggleDrawer={toggleDrawer}
            options={Options[userRole.toLowerCase()]}
          />
        </Drawer>
        <Routes>
          <Route path="/" element={<HomePage auth={auth} />} />
        </Routes>
        <Routes>
          <Route
            path="/signin"
            element={
              <SignIn
                setUserTab={setUserTab}
                setIsSigned={setIsSigned}
                setOptions={setOptions}
              />
            }
          />
        </Routes>
        <Routes>
          <Route path="/unauthorized" element={<UnAuthorized />} />
        </Routes>
        <Routes>
          <Route path="/logout" element={<SignOut />} />
        </Routes>
        <AppBarAdmin />
        <AppBarStudent />
      </BrowserRouter>
      <Footer />
    </>
  );
};
export default MainPage;
