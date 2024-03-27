import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
export const SignOut = ({
  setUserTab,
  setIsSigned,
  setOptions,
  setCloseDropDown,
}) => {
  const navigate = useNavigate();
  const handleLogOUt = () => {
    setUserTab("");
    setIsSigned(false);
    setOptions([]);
    Cookies.remove("us");
    setCloseDropDown(null);
    navigate("/");
  };
  return (
    <MenuItem onClick={handleLogOUt}>
      <Typography textAlign="center">Logout</Typography>
    </MenuItem>
  );
};
