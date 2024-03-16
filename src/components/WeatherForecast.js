import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWeatherForecast, isLoading } from "../slices/weatherForecastSlice";
import { getWeatherForecast } from "../actions/WeatherForecastAction";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { loginResult } from "../slices/userSlices";
import Cookies from "js-cookie";
const WeatherForecast = () => {
  const listWeather = useSelector(listWeatherForecast);
  const isLoading1 = useSelector(isLoading);
  const result = useSelector(loginResult);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWeatherForecast());
  }, []);
  const handeReload = () => {
    const myCookieValue = Cookies.get("us");
    dispatch(getWeatherForecast());
  };
  return isLoading1 === "succeeded" ? (
    <Box mt={20}>
      <Typography mb={10} mt={10} color="error">
        Header Right Here
      </Typography>
      <Button onClick={handeReload} variant="contained" color="primary">
        Reload
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">TemperatureC</TableCell>
              <TableCell align="right">TemperatureF</TableCell>
              <TableCell align="right">Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listWeather?.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.temperatureC}</TableCell>
                <TableCell align="right">{row.temperatureF}</TableCell>
                <TableCell align="right">{row.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default WeatherForecast;
