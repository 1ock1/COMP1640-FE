import { apiEndpointStaging, path } from "../helpers/apiEndpoints";

export const downloadZipFile = (reportId) => {
  fetch(apiEndpointStaging + path.file.downloadZip + reportId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Report " + reportId;
      link.click();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
