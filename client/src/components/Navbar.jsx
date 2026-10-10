import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../lib/store";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleSwitchAccount = () => {
    navigate("/login");
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "donor":
        return { label: "Food Donor", class: "role-donor" };
      case "ngo":
        return { label: "NGO Partner", class: "role-ngo" };
      case "admin":
        return { label: "Operations Admin", class: "role-admin" };
      default:
        return { label: "Member", class: "role-default" };
    }
  };

  const roleMeta = user ? getRoleBadge(user.role) : null;

  return (
    <header className="app-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand-link">
            <Logo size="md" />
          </Link>
          <span className="navbar-city-pill">Hyderabad</span>
        </div>

        <div className="navbar-right">
          {user && (
            <div className="navbar-profile-wrapper" ref={menuRef}>
              <button
                type="button"
                className="profile-menu-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
              >
                <div className="user-avatar-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-text-meta">
                  <span className="user-display-name">{user.name}</span>
                  <span className={`user-role-tag ${roleMeta?.class}`}>
                    {roleMeta?.label}
                  </span>
                </div>
                <svg
                  className={`menu-chevron ${menuOpen ? "open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {menuOpen && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-user-header">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-role">{roleMeta?.label} · Hyderabad</p>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleSwitchAccount}
                  >
                    <span className="dropdown-icon">🔄</span>
                    <span>Switch account</span>
                  </button>
                  <button
                    type="button"
                    className="dropdown-item dropdown-item-danger"
                    onClick={handleSignOut}
                  >
                    <span className="dropdown-icon">🚪</span>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
