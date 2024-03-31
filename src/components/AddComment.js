import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
export const AddComment = ({ setComment }) => {
  const [content, setContent] = React.useState("");
  return (
    <>
      <TextField
        id="my-textarea"
        label="Enter your comment"
        multiline
        rows={3}
        variant="outlined"
        fullWidth
        onChange={(event) => setContent(event.target.value)}
        value={content}
      />
      <Button
        variant="contained"
        style={{
          marginTop: 20,
        }}
        onClick={() => {
          setComment(content);
          setContent("");
        }}
        disabled={content === ""}
      >
        Add Comment
      </Button>
    </>
  );
};
