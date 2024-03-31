import { Link } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { Alert } from "@mui/material";
export const ListReport = ({ reports }) => {
  return (
    <Box>
      {reports === undefined && <CircularProgress />}
      {reports?.map((report) => (
        <Link
          style={{ textDecoration: "none" }}
          to={"/coordinator/topics/report/" + report?.reportId}
        >
          <Box mt={2}>
            <Paper elevation={2} style={{ padding: "20px 20px" }}>
              <Box display="flex">
                <TipsAndUpdatesIcon sx={{ fontSize: 80 }} />
                <Box>
                  <Typography fontWeight={600}>{report.name}</Typography>
                  <Typography>{report.status}</Typography>
                  <Typography>{report.lastDateComment}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Link>
      ))}
      {reports?.length === 0 && (
        <Box mt={2} mb={2}>
          <Alert severity="warning">This topic is empty contribution.</Alert>
        </Box>
      )}
    </Box>
  );
};
