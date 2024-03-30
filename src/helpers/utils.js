export const FormateDate = (date) => {
  const newDate = new Date(date);
  //   const result = newDate.toLocaleDateString().split("T")[0];
  const day = newDate.getDate().toString().padStart(2, "0"); // Get day with leading zero
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Get month with leading zero
  const year = newDate.getFullYear();
  console.log(month);
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
