import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
export const AlertDialog = ({ header, text, isAlert, setIsAlert }) => {
  const handleClose = () => {
    setIsAlert(false);
  };
  return (
    <>
      <Dialog
        open={isAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AlertTopRight = ({ open, message }) => {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        message={message}
      />
    </Box>
  );
};

export const AlertAcceptSaveChange = ({
  isAlert,
  header,
  text,
  setIsAlert,
  saveChangeAction,
}) => {
  const handleClose = () => {
    setIsAlert(false);
  };
  return (
    <>
      <Dialog
        open={isAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={saveChangeAction} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AlertAcceptDeleteImage = ({
  isAlert,
  setIsAlert,
  header,
  text,
  url,
  deleteAction,
}) => {
  const handleClose = () => {
    setIsAlert(false);
  };
  return (
    <>
      <Dialog
        open={isAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
          <img
            srcSet={`https://comp1640storage.blob.core.windows.net/hehe/${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`https://comp1640storage.blob.core.windows.net/hehe/${url}?w=164&h=164&fit=crop&auto=format`}
            loading="lazy"
            style={{
              width: "100%",
              objectFit: "contain",
              height: "200px",
            }}
            alt={url}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
          <Button onClick={deleteAction} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
