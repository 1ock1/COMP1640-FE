export const syncfusionToken =
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjWn9fcHdXQWBcUkFzVw==";

export const Options = {
  admin: [
    {
      value: "Home",
      link: "/admin",
    },
    {
      value: "Create Account",
      link: "/admin/signup",
    },
    {
      value: "Accounts",
      link: "/admin/accounts",
    },
    {
      value: "Falcuty",
      link: "/admin/falcuty",
    },
    {
      value: "Topic",
      link: "/admin/topics",
    },
    {
      value: "Academic",
      link: "/admin/academics",
    },
  ],
  guest: [
    {
      value: "Home",
      link: "/guest",
    },
    {
      value: "Dashboard",
      link: "/guest/dashboard",
    },
  ],
  student: [
    {
      value: "Home",
      link: "/student",
    },
  ],
  coordinator: [
    {
      value: "Home",
      link: "/coordinator",
    },
    {
      value: "Topics",
      link: "/coordinator/topics",
    },
  ],
  manager: [
    {
      value: "Home",
      link: "/manager",
    },
    {
      value: "Process",
      link: "/manager/process",
    },
  ],
};

// DateTime format
const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // Months are zero-based
const year = today.getFullYear();
export const formattedDate = `${year}-${
  month < 10 ? `0${month}` : month
}-${date}`;

export const reportStatus = ["Pending", "Editted", "Published"];
export const steps = ["Submission", "Update Contribution", "End Of Topic"];

export const userRoles = [
  "STUDENT",
  "ADMIN",
  "MANAGER",
  "COORDINATOR, GUEST",
  "GUEST",
];

export const statusAccount = ["ACTIVE", "DEACTIVE"];
