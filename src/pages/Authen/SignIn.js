import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { backgroundColor } from "../../helpers/constantColor";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuth,
  login,
  checkMultipleRole,
  loginSelectedRole,
} from "../../actions/UserActions";
import { SHA256 } from "crypto-js";
import { isStatusLogin, messageStatus } from "../../slices/userSlices";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CircularProgress } from "@mui/material";
import { Options } from "../../helpers/contanst";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../helpers/validator";
import { SelectedRoleDialog } from "../../components/SelectRoleDialog";
export default function SignIn({ setIsSigned, setUserTab, setOptions }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const isLoading = useSelector(isStatusLogin);
  const [isSelectedRoleDialogOpen, setDialogOpen] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const loginMessage = useSelector(messageStatus);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = (values) => {
    const infr = {
      email: values.email,
      password: SHA256(values.password).toString(),
    };
    const updateAccount = {
      ...account,
      email: values.email,
      password: SHA256(values.password).toString(),
    };
    setAccount(updateAccount);
    checkMultipleRole(infr).then((response) => {
      if (response.data === true) {
        setDialogOpen(true);
      } else {
        dispatch(login(infr));
      }
    });
  };
  const handleLoginSelectedRole = (values) => {
    const data = {
      email: account.email,
      password: account.password,
      roleSelected: values,
    };
    setDialogOpen(false);
    dispatch(loginSelectedRole(data));
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
      checkAuth(input, cookie)
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors["email"]}
            helperText={errors["email"] ? errors["email"].message : ""}
            {...register("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            {...register("password")}
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
          <SelectedRoleDialog
            open={isSelectedRoleDialogOpen}
            setOpen={setDialogOpen}
            onClose={handleLoginSelectedRole}
          />
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
