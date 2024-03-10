import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SamplePage from "./Sample/SamplePage";
const MainPage = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem key={"hehe"} disablePadding style={{ display: "block" }}>
          <Link to="/sample" className="nav_header-link">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key={"hehe"} disablePadding style={{ display: "block" }}>
          <Link to="/hehe" className="nav_header-link">
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
          <AppBar position="static">
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
                <Link to="/sample" className="nav_header-link">
                  Shop
                </Link>
                <Link to="/hehe" className="nav_header-link">
                  Hehe
                </Link>
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={open} onClose={toggleDrawer}>
          {DrawerList}
        </Drawer>
        <Routes>
          <Route path="/sample" element={<SamplePage />} />
        </Routes>
        <Routes>
          <Route path="/hehe" element={<>hehe</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MainPage;
