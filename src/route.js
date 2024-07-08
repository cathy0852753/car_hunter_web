import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./component/loginPage";
import Manage from "./component/managePage";

const Routers = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="manage" element={<Manage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;