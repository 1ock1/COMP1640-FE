export const FormateDate = (date) => {
  const newDate = new Date(date);
  //   const result = newDate.toLocaleDateString().split("T")[0];
  const day = newDate.getDate().toString().padStart(2, "0"); // Get day with leading zero
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero
  const year = newDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const VietNamDate = () => {
  const now = new Date();
  const vietnamTimezoneOffset = 7 * 60;
  const vietnamTime = new Date(now.getTime() + vietnamTimezoneOffset * 60000);
  const formattedVietnamDate = vietnamTime.toISOString().split("T")[0];
  return formattedVietnamDate;
};
