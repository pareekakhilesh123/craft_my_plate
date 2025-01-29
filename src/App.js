import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/component/loginpage/LoginPage";
import Register from "./component/register/Register";
import Homepage from "./page/homepage/Homepage";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register/>} />
     
      </Routes>
    </Router>
  );
}

export default App;
