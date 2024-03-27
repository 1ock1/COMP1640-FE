import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
export const AddComment = () => {
  return (
    <>
      <TextField
        id="my-textarea"
        label="Enter your text"
        multiline
        rows={3} // Specify the number of rows you want
        variant="outlined"
        fullWidth
      />
      <Button
        variant="contained"
        style={{
          marginTop: 20,
        }}
      >
        Add Comment
      </Button>
    </>
  );
};
