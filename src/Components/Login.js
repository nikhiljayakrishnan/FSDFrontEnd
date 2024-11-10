import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Logo from "./ex.png";
import BackgroundGif from "./money.gif";
import axios from "axios";
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5156/api/User/Login?email=" +
          email +
          "&password=" +
          password
      );
      if (response.data.email === "admin@yopmail.com") {
        navigate("/signup");
      } else {
        navigate(`/Addexpenses?userId=${response.data.id}`);
      }
      console.log("Login successful:", response.data);
      // Handle successful login (e.g., save token, redirect)
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${BackgroundGif})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: "400px",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Expense Tracker Logo"
          sx={{ width: "100px", marginBottom: 2 }}
        />
        <Typography variant="h5" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please log in to your account
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            variant="contained"
            sx={{
              marginTop: 2,
              width: "100%",
              backgroundColor: "#00796b",
              "&:hover": { backgroundColor: "#004d40" },
            }}
          >
            Log In
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don’t have an account?
          <Button
            onClick={handleSignUpClick}
            sx={{ textDecoration: "underline", color: "#00796b" }}
          >
            Sign Up
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
};
