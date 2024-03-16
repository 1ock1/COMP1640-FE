import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

export const SignOut = ({ setUserTab, setIsSigned, setOptions }) => {
  const navigate = useNavigate();
  const handleLogOUt = () => {
    setUserTab("");
    setIsSigned(false);
    setOptions([]);
    Cookies.remove("us");
    navigate("/");
  };
  return (
    <Button
      style={{ backgroundColor: "red", color: "white" }}
      onClick={handleLogOUt}
    >
      Logout <Logout />
    </Button>
  );
};
