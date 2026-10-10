import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../lib/store";

export default function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Redirect to the user's appropriate portal based on their role
    const roleRoutes = {
      donor: "/donor",
      ngo: "/ngo",
      admin: "/admin",
    };
    const targetRoute = roleRoutes[user.role] || "/login";
    return <Navigate to={targetRoute} replace />;
  }

  return children;
}
