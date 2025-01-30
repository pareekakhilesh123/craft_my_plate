import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  Link,
  Snackbar, 
  Alert, 
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [serverError, setServerError] = useState(""); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(""); 

  const navigate = useNavigate(); 

  const validate = () => {
    const tempErrors = {};
    if (!formData.username) {
      tempErrors.username = "Username is required.";
    } else if (formData.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters.";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setServerError(""); 

      try {
        const response = await axios.post("http://localhost:3001/api/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });

        console.log("Registered users: ", response.data);

        setSnackbarMessage("Registration Successful!");
        setOpenSnackbar(true);

        setTimeout(() => {
          navigate("/login"); 
        }, 2000);

      } catch (error) {
        setServerError(error.response?.data?.message || "Something went wrong.");
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          {serverError && (
            <Typography color="error" variant="body2" align="center">
              {serverError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading} 
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} 
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
