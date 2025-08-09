import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: undefined,
      }));
    }
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginMessage("");

    if (validate()) {
      console.log("Login data:", formData);
      setLoginMessage("Login successful! Redirecting...");
      navigate('/products')

    } else {
      setLoginMessage("Please fix the errors above.");
      console.log("Login validation failed.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>

        {loginMessage && (
          <Alert
            severity={
              loginMessage.includes("successful") ? "success" : "error"
            }
            sx={{ mt: 2 }}
          >
            {loginMessage}
          </Alert>
        )}

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3 }}
        >
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2" }}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
