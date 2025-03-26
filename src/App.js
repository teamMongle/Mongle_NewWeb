import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../src/components/common/Login";
import Signup from "../src/components/common/Signup";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App;
