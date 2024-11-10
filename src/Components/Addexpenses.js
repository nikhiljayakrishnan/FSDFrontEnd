import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export const Addexpenses = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [filterCategory, setFilterCategory] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const newExpense = { amount, category, date };
    try {
      postExpense(newExpense);
    } catch (error) {
      console.error(" failed:", error);
    }
    if (editingIndex !== null) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editingIndex ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setSnackbarMessage("Expense updated successfully!");
      navigate(`/view?userId=${userId}`);
    } else {
      setExpenses([...expenses, newExpense]);
      setSnackbarMessage("Expense added successfully!");
      navigate(`/view?userId=${userId}`);
    }

    resetForm();
    setSnackbarOpen(true);
  };
  const postExpense = async (newExpense) => {
    try {
      const response = await axios.post(
        "http://localhost:5156/api/Expense",
        {
          amount: newExpense.amount,
          type: newExpense.category,
          date: newExpense.date,
          userId: userId,
        },
        {
          headers: { Accept: "text/plain", "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const resetForm = () => {
    setEditingIndex(null);
    setAmount("");
    setCategory("");
    setDate("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const filteredExpenses = filterCategory
    ? expenses.filter((expense) => expense.category === filterCategory)
    : expenses;

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "5%",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: 3,

        backgroundColor: "#f5f5f5",
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Expense Tracker
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          variant="outlined"
          margin="normal"
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          required
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          {editingIndex !== null ? "Update" : "Add"} Expense
        </Button>
      </Box>

      {/* <TableContainer component={Paper} sx={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <Button  color="primary" size="small" sx={{ marginRight: 1 }}>
                    Edit
                  </Button>
                  <Button  color="secondary" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
