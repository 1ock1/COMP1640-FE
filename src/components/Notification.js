import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
export const Notifications = ({ list, onClose }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
      }}
    >
      {list?.map((obj, idx) => (
        <Link
          to={obj.description}
          key={obj.id}
          onClick={() => {
            onClose(obj.id);
          }}
        >
          <ListItemButton>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://www.reminiscencetheatrearchive.org.uk/wp-content/uploads/cms/LOGO_Greenwich_2-658x658.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={obj.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {obj.date}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};
