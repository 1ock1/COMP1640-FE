import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { backgroundColor } from "../../helpers/constantColor";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/UserActions";
import { SHA256 } from "crypto-js";
import { isStatusLogin, messageStatus } from "../../slices/userSlices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Options } from "../../helpers/contanst";
import { apiEndpointStaging, path } from "../../helpers/apiEndpoints";
export default function SignIn({ setIsSigned, setUserTab, setOptions }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const isLoading = useSelector(isStatusLogin);
  const loginMessage = useSelector(messageStatus);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const infr = {
      email: data.get("email"),
      password: SHA256(data.get("password")).toString(),
    };
    dispatch(login(infr));
  };
  useEffect(() => {
    const cookie = Cookies.get("us");
    if (cookie === undefined) {
      setMessage("Login to use your role function");
      return;
    }
    try {
      const input = {
        token: cookie,
      };
      axios
        .post(apiEndpointStaging + path.user.authRole, input, {
          headers: {
            Authorization: `Bearer ` + cookie,
          },
        })
        .then((response) => {
          const decoded = jwtDecode(cookie);
          if (decoded["role"] === response.data.role) {
            setIsSigned(true);
            setUserTab(response.data.role);
            setOptions(Options[response.data.role]);
            navigate("/" + response.data.role.toLowerCase());
          }
        })
        .catch((err) => setMessage("Login to the GISM"));
    } catch (err) {
      setMessage("You are run out of expired time, sign in again");
    }
  }, [isLoading]);

  useEffect(() => {
    setMessage(loginMessage);
  }, [loginMessage]);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 6,
          py: 3,
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "50%",
            width: "50%",
          }}
          alt="The house from the offer."
          src="https://greenwich.edu.vn/wp-content/uploads/2022/05/2022-Greenwich-Eng.png"
        />
        <Typography component="h4" variant="h4">
          Sign In
        </Typography>
        {message && (
          <Typography fontSize={18} color="error" mt={1} mb={1}>
            {message}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: backgroundColor }}
            disabled={isLoading === "loading"}
          >
            Sign In {isLoading === "loading" && <CircularProgress size={20} />}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
