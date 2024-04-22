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
  Alert,
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
import { jwtDecode } from "jwt-decode";
import { apiEndpointLocal, path } from "../helpers/apiEndpoints";

const MainPage = () => {
  const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userRole = useSelector(role);
  const [open, setOpen] = React.useState(false);
  const [userTab, setUserTab] = React.useState(undefined);
  const [notifications, setNotification] = React.useState(undefined);
  const [isNotifiSelectDeleted, setNotifiSelectedStatus] =
    React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [auth, setAuth] = React.useState({});
  const [isSigned, setIsSigned] = React.useState(false);
  const matches992 = useMediaQuery("(max-width:992px)");
  const matches576 = useMediaQuery("(max-width:576px)");
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
    setAnchorElNoti(null);
  };
  const fetchNotification = () => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      return;
    }
    const decoded = jwtDecode(cookie);
    const data = {
      toUserId: parseInt(decoded["usid"]),
      isRead: false,
    };
    axios
      .post(apiEndpointLocal + path.notify.getNotification, data)
      .then((rep) => {
        setNotification(rep.data);
      });
  };
  const handleRemoveReadedNotification = (id) => {
    axios
      .delete(apiEndpointLocal + path.notify.deleteNotification + id)
      .then((rep) => setNotifiSelectedStatus(rep.data));
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

  React.useEffect(() => {
    if (isSigned === true) {
      fetchNotification();
    }
  }, [isSigned]);
  React.useEffect(() => {
    if (isNotifiSelectDeleted) {
      handleCloseNoti();
      fetchNotification();
      setNotifiSelectedStatus(false);
    }
  }, [isNotifiSelectDeleted]);
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
                {!matches992 && userTab === "STUDENT" ? (
                  <AppLinkStudent />
                ) : !matches992 && userTab === "ADMIN" ? (
                  <AppLinkAdmin />
                ) : !matches992 && userTab === "COORDINATOR" ? (
                  <AppLinkCoordinator />
                ) : !matches992 && userTab === "GUEST" ? (
                  <AppLinkGuest />
                ) : !matches992 && userTab === "MANAGER" ? (
                  <AppLinkManager />
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
                    <Badge badgeContent={notifications?.length} color="error">
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
                    {notifications?.length === 0 ? (
                      <Alert severity="success">
                        Yayy. You dont have any notification.
                      </Alert>
                    ) : (
                      <Notifications
                        list={notifications}
                        onClose={handleRemoveReadedNotification}
                      />
                    )}
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
