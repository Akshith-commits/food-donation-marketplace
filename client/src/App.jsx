import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./components/Toast";
import { getCurrentUser } from "./lib/store";

function AppRedirect() {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  const roleRoutes = {
    donor: "/donor",
    ngo: "/ngo",
    admin: "/admin",
  };
  return <Navigate to={roleRoutes[user.role] || "/login"} replace />;
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<AppRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/donor"
            element={
              <ProtectedRoute role="donor">
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ngo"
            element={
              <ProtectedRoute role="ngo">
                <NgoDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
