import React from "react";
import axios from "axios";
import { apiEndpointStaging, path } from "../../helpers/apiEndpoints";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../../actions/UserActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import { message } from "../../helpers/messageConstant";
import { statusAccount, userRoles } from "../../helpers/contanst";
import { AlertDialog, AlertTopRight } from "../../components/AlertDialog";

export default function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based
  const year = today.getFullYear();
  const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${date}`;
  const [isMatchPassword, setIsMatchPassword] = React.useState(true);
  const [faculties, setFaculties] = React.useState(undefined);
  const [alertDiaglog, setOpenAlert] = React.useState(false);
  const [openNotify, setOpenNotify] = React.useState(false);
  const [messageNotify, setMessageNotify] = React.useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
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
        facultyId: data.faculty,
      };
      axios
        .post(apiEndpointStaging + path.user.checkIsEmailExisted + data.email)
        .then((response) => {
          if (response.data === true) {
            setOpenAlert(true);
          } else {
            dispatch(signup(infr));
            setOpenNotify(true);
            setMessageNotify(message.createAccountSuccess);
            reset();
          }
        })
        .catch((err) => {
          setOpenAlert(false);
          setOpenNotify(true);
          setMessageNotify(message.createAccountFailure);
        });
    }
  };
  React.useEffect(() => {
    axios
      .get(apiEndpointStaging + path.falcuty.getall)
      .then((response) => {
        setFaculties(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  React.useEffect(() => {
    const cookie = Cookies.get("us");
    const input = {
      token: cookie,
    };
    checkAuth(input, cookie)
      .then((response) => {
        const data = response.data;
        if (data.role === "UNAUTHORIZED") {
          navigate("/signin");
          Cookies.remove("us");
        }
      })
      .catch(() => {
        navigate("/signin");
        Cookies.remove("us");
      });
  });
  React.useEffect(() => {
    if (openNotify) {
      setTimeout(() => {
        setOpenNotify(false);
      }, 3000);
    }
  }, [openNotify]);
  return (
    <Container maxWidth="sm">
      <AlertTopRight open={openNotify} message={messageNotify} />
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
            name="faculty"
            select
            label="Select Faculty"
            SelectProps={{
              native: true,
            }}
            fullWidth
            {...register("faculty")}
            required
            id="email"
          >
            {faculties?.map((object, index) => (
              <option key={index} value={object.id}>
                {object.name}
              </option>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Role"
            name="role"
            SelectProps={{
              native: true,
            }}
            select
            error={!!errors["role"]}
            helperText={errors["role"] ? errors["role"].message : ""}
            {...register("role")}
          >
            {userRoles?.map((object, index) => (
              <option key={index} value={object}>
                {object}
              </option>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="email"
            label="Status"
            name="status"
            SelectProps={{
              native: true,
            }}
            error={!!errors["status"]}
            helperText={errors["status"] ? errors["status"].message : ""}
            {...register("status")}
          >
            {statusAccount?.map((object, index) => (
              <option key={index} value={object}>
                {object}
              </option>
            ))}
          </TextField>
          <TextField
            margin="normal"
            name="birthdate"
            label="BirthDate"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue={formattedDate}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: backgroundColor }}
          >
            Create An Account
          </Button>
        </Box>
      </Box>
      <AlertDialog
        isAlert={alertDiaglog}
        setIsAlert={setOpenAlert}
        header="Email is existed"
        text={"Email is existed, please create another email"}
      />
    </Container>
  );
}
