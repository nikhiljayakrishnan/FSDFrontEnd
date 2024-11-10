import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Logo from "./ex.png";
import BackgroundGif from "./money.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you'll use axios for API calls

export const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // If validation passes, send data to your API
    const userData = {
      firstName,
      lastName,
      email,
      password,
      amount,
      phonenumber,
    };
    try {
      const response = await axios.post(
        "http://localhost:5156/api/User",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          income: amount,
          phoneNumber: phonenumber,
        },
        {
          headers: { Accept: "text/plain", "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
    axios
      .post("http://localhost:5156/api/User", userData)
      .then((response) => {
        console.log("User signed up successfully:", response.data);
        navigate("/login"); // Navigate to login page after successful signup
      })
      .catch((error) => {
        console.error("There was an error signing up!", error);
        setError("An error occurred. Please try again.");
      });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
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
          Create an Account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Please fill in the details to sign up
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
            label="First Name"
            variant="outlined"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <TextField
            label="Amount"
            type="text"
            variant="outlined"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="PhoneNumber"
            type="text"
            variant="outlined"
            required
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
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
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?
          <a href="/login">Log In</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
