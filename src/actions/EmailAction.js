import axios from "axios";
export const sendEmail = (template) => {
  const data = {
    service_id: "service_1paez25",
    template_id: "template_69gwwea",
    user_id: "7gNTCEZs9wVUTPYT8",
    template_params: template,
  };
  axios
    .post("https://api.emailjs.com/api/v1.0/email/send", data)
    .then((rep) => {
      const data = rep.data;
    })
    .catch((err) => console.log(err));
};
