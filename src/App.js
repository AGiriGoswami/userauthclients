import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
// import dotenv from "dotenv";
// dotenv.config();

const App = () => {
  const { authUser } = useSelector((store) => store.user);


  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
