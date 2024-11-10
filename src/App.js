import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Components/Home";
import Navbar from "./Components/Navbar";
import { Routes } from "react-router-dom";

import { Route } from "react-router-dom";

import { Addexpenses } from "./Components/Addexpenses";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/Signup";

import MediaCard from "./Components/Card";
import ColorInversionFooter from "./Components/Footer";

import HomePage from "./Components/main";
import { ExpenseShow } from "./Components/Expenseshow";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/Addexpenses" element={<Addexpenses />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/view" element={<ExpenseShow />}></Route>
      </Routes>

      <MediaCard />
      <ColorInversionFooter />
    </>
  );
}

export default App;
