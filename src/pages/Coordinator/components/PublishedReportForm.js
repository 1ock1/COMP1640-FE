import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { publishedReportSchema } from "../../../helpers/validator";
import { HelpTextDateWarning } from "../../../components/HelpTextDate";
export const PublishedReportForm = ({
  open,
  onClose,
  reportId,
  date,
  submitAction,
  disabled,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(publishedReportSchema),
  });

  const onSubmit = (value) => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // Months are zero-based
    const year = today.getFullYear();
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${date}`;
    const data = {
      title: value.title,
      description: value.description,
      publishedDate: formattedDate,
      viewedNumber: 1,
      reportId: reportId,
    };
    submitAction(data);
    reset();
    onClose();
  };
  const handleCLose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCLose} maxWidth="sm" fullWidth>
        <DialogTitle>Publishe Report</DialogTitle>
        <DialogContent>
          {disabled ? (
            <HelpTextDateWarning text="You have published this report" />
          ) : (
            <DialogContentText>
              You will publish report <strong>{reportId}</strong> at{" "}
              <strong>{date}</strong>
            </DialogContentText>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              name="title"
              label="Title"
              type="email"
              fullWidth
              variant="outlined"
              error={!!errors["title"]}
              helperText={errors["title"] ? errors["title"].message : ""}
              {...register("title")}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="description"
              label="Description"
              type="email"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              error={!!errors["description"]}
              helperText={
                errors["description"] ? errors["description"].message : ""
              }
              {...register("description")}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCLose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            type="submit"
            disabled={disabled}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
