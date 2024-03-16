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
export default function CreateAccount() {
  const dispatch = useDispatch();
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${date}`;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const infr = {
      name: data.get("name"),
      phonenumber: data.get("phonenumber"),
      birthdate: formattedDate,
      email: data.get("email"),
      password: SHA256(data.get("password")).toString(),
      role: data.get("role"),
      status: data.get("status"),
    };
    dispatch(signup(infr));
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="name"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Phone Number"
            name="phonenumber"
            autoComplete="email"
            autoFocus
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