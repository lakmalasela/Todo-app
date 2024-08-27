import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Todoview from "../views/Todoview";

export default function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }

    const handlePopstate = () => {
      if (!localStorage.getItem('isLoggedIn')) {
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication status on logout
    localStorage.removeItem('isLoggedIn');
    // Redirect to login page after logout
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4} display="flex" justifyContent="flex-start">
              <img
                src="./img/logo.png"
                alt="Logo"
                style={{ width: '100px', height: 'auto' }}
              />
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                {/* Placeholder for additional content if needed */}
              </Box>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box>
        <Todoview />
      </Box>
    </Box>
  );
}

