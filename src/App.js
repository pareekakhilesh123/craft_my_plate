import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/component/loginpage/LoginPage";
import Register from "./component/register/Register";
import Homepage from "./page/homepage/Homepage";
import DashboardApp from "./page/homepage/dashboard/DashboardApp";
import Order from "./page/homepage/dashboard/order/Order";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<DashboardApp />} />
        <Route path="/order" element={<Order />} />
     
      </Routes>
    </Router>
  );
}

export default App;
