import React from "react";
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
import { useDispatch } from "react-redux";
import { signup } from "../../actions/UserActions";
import { SHA256 } from "crypto-js";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAccountSchema,
  validatePasswordConfirm,
} from "../../helpers/validator";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${date}`;
  const [isMatchPassword, setIsMatchPassword] = React.useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = (data) => {
    if (!validatePasswordConfirm(data.password, data.confirmPassword)) {
      setIsMatchPassword(false);
    } else {
      setIsMatchPassword(true);
      const infr = {
        name: data.name,
        phonenumber: data.phoneNumber,
        birthdate: formattedDate,
        email: data.email,
        password: SHA256(data.password).toString(),
        role: data.role,
        status: data.status,
      };
      dispatch(signup(infr));
    }
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 6,
          py: 3,
          marginTop: 8,
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
          Login in
        </Typography>
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
            label="User Name"
            name="name"
            autoComplete="email"
            autoFocus
            error={!!errors["name"]}
            helperText={errors["name"] ? errors["name"].message : ""}
            {...register("name")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="email"
            autoFocus
            error={!!errors["phoneNumber"]}
            helperText={
              errors["phoneNumber"] ? errors["phoneNumber"].message : ""
            }
            {...register("phoneNumber")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
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
            id="email"
            label="Password"
            name="password"
            autoFocus
            type="password"
            error={!!errors["password"]}
            helperText={errors["password"] ? errors["password"].message : ""}
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Confirm Password"
            name="confirmPassword"
            autoFocus
            type="password"
            error={!!errors["confirmPassword"] || !isMatchPassword}
            helperText={
              (errors["confirmPassword"]
                ? errors["confirmPassword"].message
                : "") ||
              (!isMatchPassword ? "Confirm Password does not match" : "")
            }
            {...register("confirmPassword")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Role"
            name="role"
            autoComplete="email"
            autoFocus
            error={!!errors["role"]}
            helperText={errors["role"] ? errors["role"].message : ""}
            {...register("role")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Status"
            name="status"
            autoComplete="email"
            autoFocus
            error={!!errors["status"]}
            helperText={errors["status"] ? errors["status"].message : ""}
            {...register("status")}
          />
          <TextField
            margin="normal"
            name="birthdate"
            label="BirthDate"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue={formattedDate}
            fullWidth
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
          >
            Sign In
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
