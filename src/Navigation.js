import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminAddPage from "./pages/AdminAddPage";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import AdminProvider from "./contexts/AdminProvider";

function Navigation() {
  return (
    <div>
      <AdminProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </div>
  );
}

export default Navigation;
