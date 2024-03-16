import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { backgroundColor } from "../helpers/constantColor";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        GISM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const Footer = (props) => {
  const { description, title } = props;

  return (
    <Box
      component="footer"
      sx={{ py: 6 }}
      style={{ backgroundColor: "#ccc", color: "white" }}
    >
      <Container maxWidth="lg">
        <Typography align="center" gutterBottom style={{ color: "white" }}>
          {title}
        </Typography>
        <Typography align="center" component="p" style={{ color: "white" }}>
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
};
