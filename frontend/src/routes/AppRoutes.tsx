import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "../guards/AuthGuard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Owner Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>
    </Routes>
  );
}