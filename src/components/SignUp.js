import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [signupMessage, setSignupMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevState) => ({
        ...prevState,
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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupMessage("");

    if (validate()) {
      console.log("Signup data:", formData);
      setSignupMessage("Signup successful! You can now login.");
      setFormData({ email: "", password: "", confirmPassword: "" });
      setErrors({});
      navigate('/login')
    } else {
      setSignupMessage("Please fix the errors above.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          mt: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, py: 1.5 }}
          >
            Sign Up
          </Button>

          {signupMessage && (
            <Typography
              variant="body1"
              align="center"
              sx={{
                mt: 2,
                color: signupMessage.includes("successful")
                  ? "green"
                  : "error.main",
              }}
            >
              {signupMessage}
            </Typography>
          )}

          <Grid container justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
