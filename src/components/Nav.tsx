// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) {
    return <p>Error: User context is not available.</p>; // Fallback UI
  }

  const { updateUserData } = context;
  const handleClick = () => {
    localStorage.removeItem("credentials");
    updateUserData(null);
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Community
          </Typography>
          <Button onClick={handleClick} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
