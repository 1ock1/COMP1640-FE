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
  Menu,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
import { Notifications } from "../components/Notification";
import {
  AppBarCoordinator,
  AppLinkCoordinator,
} from "./Coordinator/components/AppBarCoordinator";
import {
  AppBarManager,
  AppLinkManager,
} from "./Manager/components/AppBarManager";
import { AppBarGuest, AppLinkGuest } from "./Guest/components/AppBarGuest";

const MainPage = () => {
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
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
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenNoti = (event) => {
    setAnchorElNoti(event.currentTarget);
  };

  const handleCloseNoti = () => {
    console.log("closed");
    setAnchorElNoti(null);
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
                ) : userTab === "COORDINATOR" ? (
                  <AppLinkCoordinator />
                ) : userTab === "GUEST" ? (
                  <AppLinkGuest />
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
                <Box sx={{ flexGrow: 0 }}>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    style={{ marginRight: 20 }}
                    onClick={handleOpenNoti}
                  >
                    <Badge badgeContent={1} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElNoti}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElNoti)}
                    onClose={handleCloseNoti}
                  >
                    <Notifications />
                  </Menu>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="https://cdn.universitycompare.com/content/images/UniLogo--University-of-Greenwich-Logo.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <SignOut
                      setUserTab={setUserTab}
                      setIsSigned={setIsSigned}
                      setOptions={setOptions}
                      setCloseDropDown={setAnchorElUser}
                    />
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer}>
          <DrawList toggleDrawer={toggleDrawer} options={options} />
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
        <AppBarCoordinator />
        <AppBarManager />
        <AppBarGuest />
      </BrowserRouter>
      <Footer />
    </>
  );
};
export default MainPage;
