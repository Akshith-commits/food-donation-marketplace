import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../lib/store";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "donor":
        return "Donor";
      case "ngo":
        return "NGO Partner";
      case "admin":
        return "Admin";
      default:
        return "Guest";
    }
  };

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🍲</span>
            <span className="brand-text">Food<span className="brand-accent">Bridge</span></span>
          </Link>
          <span className="brand-divider">/</span>
          <span className="navbar-section-title">Portal</span>
        </div>

        <div className="navbar-right">
          {user && (
            <div className="navbar-user-info">
              <span className="user-role-badge" data-role={user.role}>
                Role: {getRoleLabel(user.role)}
              </span>
              <span className="user-name" title={user.name}>
                {user.name}
              </span>
            </div>
          )}

          <div className="navbar-actions">
            <Link to="/login" className="nav-switch-link" title="Switch Demo Role">
              Switch Role
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="navbar-logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
