import logo from "./logo.svg";
import { enableRipple } from "@syncfusion/ej2-base";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import React, { useState } from "react";
import axios from "axios";
import Document from "./Document.tsx";
import {
  DocumentEditorContainerComponent,
  DocumentEditorComponent,
} from "@syncfusion/ej2-react-documenteditor";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import useMediaQuery from "@mui/material/useMediaQuery";
// import {
//   PdfViewerComponent,
//   Toolbar,
//   Magnification,
//   Navigation,
//   LinkAnnotation,
//   BookmarkView,
//   ThumbnailView,
//   Print,
//   TextSelection,
//   Annotation,
//   TextSearch,
//   FormFields,
//   FormDesigner,
//   Inject,
// } from "@syncfusion/ej2-react-pdfviewer";
// DocumentEditorContainerComponent.Inject(Toolbar);
const useStyle = {
  button: {
    border: "1px solid #ccc",
  },
};

const items = ["Comments"];
const Example = () => {
  return <div>hehe</div>;
};
function App() {
  let container;

  React.useEffect(() => {
    loadSfdt();
  }, []);
  const loadSfdt = () => {
    axios
      .get("https://localhost:7044/WeatherForecast/RetrieveDocument")
      .then((response) => {
        container.documentEditor.open(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleReloadUpdated = () => {
    loadSfdt();
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const matches = useMediaQuery("(min-width:600px)");
  console.log(matches);
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Button>hehe</Button>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        {matches ? (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"hehe"} />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </Box>
  );
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "red" }}>
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
              News
            </Typography>
            {matches ? (
              <Button color="inherit" style={{ fontSize: 20 }}>
                Login
              </Button>
            ) : (
              ""
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
      <button onClick={handleReloadUpdated}>Reload Update</button>
      <DocumentEditorContainerComponent
        id="container"
        ref={(scope) => {
          container = scope;
        }}
        height={"590px"}
        serviceUrl="http://localhost:62870/api/documenteditor/"
        enableToolbar={true}
        toolbarItems={items}
        readOnly={true}
        showPropertiesPane={false}
        enableComment
        // enableLockAndEdit={true}
        // restrictEditing={true}
        enableAutoFocus={false}
        zoomFactor={0.8}
      />
    </div>
  );
}

export default App;
