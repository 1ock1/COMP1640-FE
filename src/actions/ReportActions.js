import axios from "axios";
import { apiEndpointStaging, path } from "../helpers/apiEndpoints";
export const handleUpdateStatus = (status, quality, reportId, role) => {
  const data = {
    reportId: reportId,
    status: status,
    quality: quality,
    role: role,
  };
  axios
    .put(apiEndpointStaging + path.report.updateReportStatus, data)
    .then((rep) => {
      const data = rep.data;
    });
};
