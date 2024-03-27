export const apiEndpointLocal = "https://localhost:7044/"; //or replace to your localhost
export const apiEndpointStaging = "https://comp1640-stg.azurewebsites.net/";
export const apiEndpointProduction = "https://comp1640-prod.azurewebsites.net/";
export const path = {
  user: {
    login: "api/User/login",
    signup: "api/User/signup",
    authRole: "api/User/auth",
  },
  file: {
    load: "api/File/",
    upload: "api/File/UploadFile",
    save: "api/File/SaveDocument",
    delete: "api/File/",
    uploadImages: "api/File/UploadImages",
  },
  fileReport: {
    loadImages: "api/FileReport/GetDocumentImages",
  },
  students: {
    topics: "api/Topic/GetTopicsByAcademicAndFalcuty",
    getTopicId: "api/Topic/GetTopicById?id=",
    checkIsSubmitted: "api/File/IsReportSubmitted",
    getDocumentId: "api/FileReport/GetDocumentId?reportId=",
  },
  WeatherForecast: "WeatherForecast",
};
