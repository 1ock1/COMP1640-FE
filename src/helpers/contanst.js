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
      value: "Accounts Managements",
      link: "/admin/accounts",
    },
    {
      value: "Falcuty Management",
      link: "/admin/falcutys",
    },
    {
      value: "Topic Management",
      link: "/admin/topics",
    },
    {
      value: "Academic Management",
      link: "/admin/academics",
    },
  ],
  guest: [],
  student: [
    {
      value: "Home",
      link: "/student",
    },
    {
      value: "Infor",
      link: "/student/infor",
    },
  ],
  marketingCoordinator: [],
  marketingManager: [],
};

// DateTime format
const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // Months are zero-based
const year = today.getFullYear();
export const formattedDate = `${year}-${
  month < 10 ? `0${month}` : month
}-${date}`;
