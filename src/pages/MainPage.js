import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { backgroundColor } from "../helpers/constantColor";
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";

import TopicPage from "./TopicPage";
import FacultyPage from "./FacultyPage";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SamplePage from "./Sample/SamplePage";
import SignIn from "./Authen/SignIn";
import { useMediaQuery } from "@mui/material";
const MainPage = () => {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem key={"hehe"} disablePadding style={{ display: "block" }}>
          <Link
            to="/sample"
            className="nav_header-link"
            style={{ textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"hehe"} disablePadding style={{ display: "block" }}>
          <Link
            to="/hehe"
            className="nav_header-link"
            style={{ textDecoration: "none" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={"Hehe"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
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
                {matches ? (
                  <>
                    <Link
                      to="/account"
                      className="nav_header-link"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        padding: 10,
                      }}
                    >
                      Account Management
                    </Link>

                    <Link
                      to="/faculty"
                      className="nav_header-link"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        padding: 10,
                      }}
                    >
                      Faculty Management
                    </Link>

                    <Link
                      to="/topic"
                      className="nav_header-link"
                      style={{
                        textDecoration: "none",
                        color: "white",
                        padding: 10,
                      }}
                    >
                      Topic Management
                    </Link>

                  </>
                ) : (
                  ""
                )}
              </Typography>
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
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer}>
          {DrawerList}
        </Drawer>
        <Routes>
          <Route path="/account" element={<SamplePage/>} />
        </Routes>
        <Routes>
          <Route path="/faculty" element={<FacultyPage/>} />
        </Routes>
        <Routes>
          <Route path="/topic" element={<TopicPage/>} />
        </Routes>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MainPage;
