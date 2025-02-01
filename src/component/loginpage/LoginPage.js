import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { addUserInfo } from '../../slices/userSlice'


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const tempErrors = {};
    if (!username) {
      tempErrors.username = "Username is required.";
    }

    if (!password) {
      tempErrors.password = "Password is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post("http://localhost:3001/api/login", {
          email: username,
          password,
        });
        setUsername()

        if (response.data.status === "success") {
          setSnackbar({
            open: true,
            message: "Login successful!",
            severity: "success",
          });
          dispatch(addUserInfo(
            {
              name: response.data.name,
            token: response.data.token
          }
        ))

          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 1000); 
        } else {
          setSnackbar({
            open: true,
            message: response.data.message || "Invalid credentials.",
            severity: "error",
          });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setSnackbar({
            open: true,
            message: error.response.data.message || "Server error. Please try again.",
            severity: "error",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Network error. Please check your connection and try again.",
            severity: "error",
          });
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Email"
            name="username"
            autoComplete="off"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
