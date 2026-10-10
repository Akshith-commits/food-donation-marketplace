import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setCurrentUser, getCurrentUser, getNgos } from "../lib/store";
import Banner from "../components/Banner";

export default function LoginPage() {
  const navigate = useNavigate();
  const existingUser = getCurrentUser();

  const [name, setName] = useState(existingUser?.name || "");
  const [selectedNgoType, setSelectedNgoType] = useState("verified"); // 'verified' or 'unverified'

  const ngos = getNgos();

  const verifiedNgo = ngos.find((n) => n.verified) || { name: "Hope Food Bank" };
  const unverifiedNgo = ngos.find((n) => !n.verified) || { name: "Community Table Relief" };

  const handleSelectRole = (role) => {
    let finalName = name.trim();

    if (role === "donor") {
      if (!finalName) finalName = "Golden Spoon Bakery";
      setCurrentUser({ role: "donor", name: finalName });
      navigate("/donor");
    } else if (role === "ngo") {
      if (!finalName) {
        finalName = selectedNgoType === "unverified" ? unverifiedNgo.name : verifiedNgo.name;
      }
      setCurrentUser({ role: "ngo", name: finalName });
      navigate("/ngo");
    } else if (role === "admin") {
      if (!finalName) finalName = "Platform Administrator";
      setCurrentUser({ role: "admin", name: finalName });
      navigate("/admin");
    }
  };

  const setPresetProfile = (presetName, role) => {
    setName(presetName);
    if (role === "ngo") {
      if (presetName === unverifiedNgo.name) {
        setSelectedNgoType("unverified");
      } else {
        setSelectedNgoType("verified");
      }
    }
  };

  return (
    <div className="login-page-root">
      <Banner />

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <span className="brand-icon">🍲</span>
              <span className="brand-text">Food<span className="brand-accent">Bridge</span></span>
            </Link>
            <h1>Demo Access Portal</h1>
            <p className="login-subtext">
              Select any role below to experience the end-to-end food rescue workflow. No password required for this prototype.
            </p>
          </div>

          {existingUser && (
            <div className="current-session-box">
              <span className="session-dot" />
              <span>
                Currently active: <strong>{existingUser.name}</strong> ({existingUser.role.toUpperCase()})
              </span>
            </div>
          )}

          {/* Optional Name Field */}
          <div className="form-group name-field-group">
            <label htmlFor="user-name-input">
              User / Organization Name <span className="label-optional">(optional - defaults provided)</span>
            </label>
            <input
              id="user-name-input"
              type="text"
              placeholder="e.g. Golden Spoon Bakery, Hope Food Bank..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="login-input"
            />
          </div>

          {/* Quick preset chips */}
          <div className="presets-section">
            <span className="presets-title">Quick Demo Profiles:</span>
            <div className="preset-chips">
              <button
                type="button"
                className="chip-btn"
                onClick={() => setPresetProfile("Golden Spoon Bakery", "donor")}
              >
                🥖 Golden Spoon (Donor)
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => setPresetProfile(verifiedNgo.name, "ngo")}
              >
                ✅ {verifiedNgo.name} (Verified NGO)
              </button>
              <button
                type="button"
                className="chip-btn chip-warning"
                onClick={() => setPresetProfile(unverifiedNgo.name, "ngo")}
              >
                ⚠️ {unverifiedNgo.name} (Unverified NGO)
              </button>
              <button
                type="button"
                className="chip-btn"
                onClick={() => setPresetProfile("Platform Administrator", "admin")}
              >
                🛡️ Platform Admin
              </button>
            </div>
          </div>

          {/* Big Role Action Buttons */}
          <div className="role-buttons-grid">
            {/* Donor Option */}
            <div className="role-card role-donor" onClick={() => handleSelectRole("donor")}>
              <div className="role-card-badge">Commercial Donors</div>
              <div className="role-card-icon">🥖</div>
              <h3>Continue as Donor</h3>
              <p>Post excess batches in seconds, manage pickup locations, and monitor distribution statuses.</p>
              <button
                type="button"
                className="role-action-btn btn-donor"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRole("donor");
                }}
              >
                Enter Donor Portal →
              </button>
            </div>

            {/* NGO Option */}
            <div className="role-card role-ngo" onClick={() => handleSelectRole("ngo")}>
              <div className="role-card-badge">Charities & Shelters</div>
              <div className="role-card-icon">🤝</div>
              <h3>Continue as NGO</h3>
              <p>Discover real-time donation feeds, claim available meals, and manage pickup logistics.</p>

              <div className="ngo-preset-toggle" onClick={(e) => e.stopPropagation()}>
                <span className="toggle-label">Test Verification State:</span>
                <div className="radio-group">
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="ngoVerifiedState"
                      checked={selectedNgoType === "verified"}
                      onChange={() => {
                        setSelectedNgoType("verified");
                        setName(verifiedNgo.name);
                      }}
                    />
                    <span>Verified</span>
                  </label>
                  <label className="radio-item">
                    <input
                      type="radio"
                      name="ngoVerifiedState"
                      checked={selectedNgoType === "unverified"}
                      onChange={() => {
                        setSelectedNgoType("unverified");
                        setName(unverifiedNgo.name);
                      }}
                    />
                    <span>Unverified (Pending)</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="role-action-btn btn-ngo"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRole("ngo");
                }}
              >
                Enter NGO Hub →
              </button>
            </div>

            {/* Admin Option */}
            <div className="role-card role-admin" onClick={() => handleSelectRole("admin")}>
              <div className="role-card-badge">Operations</div>
              <div className="role-card-icon">📊</div>
              <h3>Continue as Admin</h3>
              <p>Inspect city-wide food recovery metrics, verify onboarding NGOs, and monitor platform activity.</p>
              <button
                type="button"
                className="role-action-btn btn-admin"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRole("admin");
                }}
              >
                Enter Admin Center →
              </button>
            </div>
          </div>

          <div className="login-footer">
            <Link to="/" className="back-home-link">
              ← Return to Landing Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
