import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const password = localStorage.getItem("password");

  useEffect(() => {
    if (!name || !password) {
      if (window.location.pathname !== "/register") {
        navigate("/login");
      }
    }
  }, [name, password, navigate]);

  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Register />} path="/register" />
      <Route element={<Home />} path="/home" />
    </Routes>
  );
}

export default App;
