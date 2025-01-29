import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
function Navbar() {
    const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
     <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar
          position="static"
          sx={{ bgcolor: "#F0BB78", color: "#543A14" }}
          elevation={0} 
        >
          <Toolbar variant="regular">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Food Ordering System
            </Typography>
     
            {!isMobile && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/menu">
                  Menu
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                  Cart
                </Button>
                <Button color="inherit" component={Link} to="/order">
                  Order
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar