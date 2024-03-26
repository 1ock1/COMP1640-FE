import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { apiEndpointStaging, path } from "../helpers/apiEndpoints";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";
import { Box, Typography } from "@mui/material";
export const TermPolicy = ({
  handleUpload,
  open,
  setOpen,
  onAccept,
  setAccept,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAccept(false);
    setOpen(false);
  };
  return (
    <>
      {" "}
      <React.Fragment>
        <Button variant="contained" onClick={handleClickOpen}>
          Submit
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Term & Policy"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You have to accept that your coordinator will edit your submission
              until your submission is published.
            </DialogContentText>
            <Box display="flex" mt={2}>
              <Checkbox
                style={{ padding: 0 }}
                label="Label"
                defaultChecked={onAccept}
                onClick={() => setAccept(!onAccept)}
              />
              <Typography style={{ marginLeft: 5 }}>
                I accept the term and policy
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button color="error" variant="contained" onClick={handleClose}>
              Disagree
            </Button>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              disabled={!onAccept}
            >
              Agree
              <VisuallyHiddenInput
                type="file"
                accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleUpload}
              />
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
};
