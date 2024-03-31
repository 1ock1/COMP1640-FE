export const apiEndpointLocal = "https://localhost:7044/"; //or replace to your localhost
export const apiEndpointStaging = "https://comp1640-stg.azurewebsites.net/";
export const apiEndpointProduction = "https://comp1640-prod.azurewebsites.net/";
export const apiFEEndpointLocal = "http://localhost:3000/";
export const apiFEEndpointStg = "https://comp1640-stg-be472.web.app/";
export const path = {
  user: {
    login: "api/User/login",
    signup: "api/User/signup",
    authRole: "api/User/auth",
    isMultipleRole: "api/User/checkMultipleRole",
    loginAsSelectedRole: "api/User/loginSelectedRole",
    getCoordinatorInfor: "api/User/GetCoordinatorInformation",
  },
  file: {
    load: "api/File/",
    upload: "api/File/UploadFile",
    update: "api/File/UpdateFile",
    save: "api/File/SaveDocument",
    delete: "api/File/",
    uploadImages: "api/File/UploadImages",
  },
  fileReport: {
    loadImages: "api/FileReport/GetDocumentImages",
    getAllFileReport: "api/FileReport/GetAllFileOfOneReport?reportId=",
  },
  students: {
    topics: "api/Topic/GetTopicsByAcademicAndFalcuty",
    getTopicId: "api/Topic/GetTopicById?id=",
    checkIsSubmitted: "api/File/IsReportSubmitted",
    getDocumentId: "api/FileReport/GetDocumentId?reportId=",
  },
  academic: {
    getall: "api/Academic/GetAllAcademic",
    create: "api/Academic/CreateAcademic",
    update: "api/Academic/UpdateAcademic?id=",
    delete: "api/Academic/DeleteAcademic?id=",
  },
  falcuty: {
    getall: "api/Faculty",
    create: "api/Faculty",
    update: "api/Faculty/",
  },
  topic: {
    getall: "api/Topic/GetAllTopic",
    create: "api/Topic/CreateTopic",
    update: "api/Topic/UpdateTopic?id=",
    delete: "api/Topic/DeleteTopic?id=",
    checkIsTopicAllowed: "api/Topic/CheckIsTopicAllowed",
  },
  report: {
    getReportBaseStatus: "api/Report/GetReportBaseStatus",
    getReportInformation: "api/Report/GetReportInformation?reportId=",
    updateReportStatus: "api/Report/UpdateReportStatus",
  },
  notify: {
    createNoti: "api/Notifcation/CreateNoti",
    getNotification: "api/Notifcation/GetNotification",
    deleteNotification: "api/Notifcation/DeleteNotification?notifyId=",
  },
  comment: {
    createComment: "api/ReportComment/CreateComment",
    getReportComment: "api/ReportComment/GetCommentReport",
  },
  publishedReport: {
    create: "api/PubllishedReport/CreatePublishedReport",
    isPublishReportExist:
      "api/PubllishedReport/CheckIfReportPublished?reportId=",
  },
  WeatherForecast: "WeatherForecast",
};
