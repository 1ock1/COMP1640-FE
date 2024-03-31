import { Typography } from "@mui/material";
export const HelpTextDateWarning = ({ text, date }) => {
  return (
    <>
      <Typography mt={1} color="error" style={{ fontSize: 12 }}>
        {text}: <strong>{date}</strong>
      </Typography>
    </>
  );
};

export const HelpTextDatInfor = ({ text, date }) => {
  return (
    <>
      <Typography mt={1} color="#808080" style={{ fontSize: 12 }}>
        {text}: <strong>{date}</strong>
      </Typography>
    </>
  );
};
