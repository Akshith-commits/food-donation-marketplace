import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { setCurrentUser, HYDERABAD_DONORS, HYDERABAD_NGOS } from "../lib/store";
import Logo from "../components/Logo";

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("donor"); // 'donor', 'ngo', 'admin'
  const [selectedDonorId, setSelectedDonorId] = useState("donor-1");
  const [selectedNgoId, setSelectedNgoId] = useState("ngo-1");
  const [password, setPassword] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeDonor = HYDERABAD_DONORS.find((d) => d.id === selectedDonorId) || HYDERABAD_DONORS[0];
  const activeNgo = HYDERABAD_NGOS.find((n) => n.id === selectedNgoId) || HYDERABAD_NGOS[0];

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (activeTab === "donor") {
        setCurrentUser({
          role: "donor",
          name: activeDonor.name,
          email: activeDonor.email,
          area: activeDonor.area,
        });
        navigate("/donor");
      } else if (activeTab === "ngo") {
        setCurrentUser({
          role: "ngo",
          name: activeNgo.name,
          email: activeNgo.contact,
          area: activeNgo.area,
          verified: activeNgo.verified,
        });
        navigate("/ngo");
      } else if (activeTab === "admin") {
        setCurrentUser({
          role: "admin",
          name: "Operations Administrator",
          email: "admin@foodbridge.org",
        });
        navigate("/admin");
      }
    }, 400);
  };

  const getEmailForTab = () => {
    if (activeTab === "donor") return activeDonor.email;
    if (activeTab === "ngo") return activeNgo.contact;
    return "admin@foodbridge.org";
  };

  return (
    <div className="signin-split-container">
      {/* Left visual column with authentic food photograph background */}
      <div className="signin-left-col">
        <div
          className="signin-bg-image"
          style={{ backgroundImage: `url('/images/biryani.jpg')` }}
        />
        <div className="signin-bg-overlay" />

        <div className="signin-left-content">
          <Link to="/" className="signin-brand-link">
            <Logo size="lg" />
          </Link>

          <div className="signin-hero-statement">
            <h1>Connecting surplus kitchens with local hunger relief across Hyderabad.</h1>
            <p>
              From Charminar to Hitech City, commercial kitchens redirect surplus meals to accredited shelters in under 60 seconds.
            </p>
          </div>

          <div className="signin-stats-pills">
            <div className="pill-item">
              <span className="pill-val">1,150+</span>
              <span className="pill-lbl">Meals Recovered</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-val">6 Zones</span>
              <span className="pill-lbl">Active Coverage</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-val">100%</span>
              <span className="pill-lbl">GPS Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: glass sign-in card */}
      <div className="signin-right-col">
        <motion.div
          className="signin-glass-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="card-top-header">
            <h2>Welcome back</h2>
            <p>Sign in to your organization's FoodBridge account</p>
          </div>

          {/* Three Role Tabs */}
          <div className="role-tab-switch">
            {[
              { id: "donor", label: "Donor", icon: "🥖" },
              { id: "ngo", label: "NGO", icon: "🤝" },
              { id: "admin", label: "Admin", icon: "🛡️" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tab-btn-pill ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="tab-pill-highlight"
                    layoutId="activeRoleTab"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="tab-btn-label">
                  <span className="tab-icon">{tab.icon}</span>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Animated Tab Content Form */}
          <form onSubmit={handleSignIn} className="signin-form">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="tab-fields-wrap"
              >
                {activeTab === "donor" && (
                  <div className="form-group mb-3">
                    <label htmlFor="donorSelect">Organization Account</label>
                    <select
                      id="donorSelect"
                      className="input-select"
                      value={selectedDonorId}
                      onChange={(e) => setSelectedDonorId(e.target.value)}
                    >
                      {HYDERABAD_DONORS.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.area})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === "ngo" && (
                  <div className="form-group mb-3">
                    <label htmlFor="ngoSelect">Relief Organization</label>
                    <select
                      id="ngoSelect"
                      className="input-select"
                      value={selectedNgoId}
                      onChange={(e) => setSelectedNgoId(e.target.value)}
                    >
                      {HYDERABAD_NGOS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name} {n.verified ? "(Verified)" : "(Pending Verification)"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === "admin" && (
                  <div className="form-group mb-3">
                    <label>Role</label>
                    <div className="input-static">
                      Operations & Dispatch Administrator
                    </div>
                  </div>
                )}

                <div className="form-group mb-3">
                  <label htmlFor="signinEmail">Work Email</label>
                  <input
                    id="signinEmail"
                    type="email"
                    required
                    readOnly
                    value={getEmailForTab()}
                    className="input-text readonly"
                  />
                </div>

                <div className="form-group mb-4">
                  <div className="label-row">
                    <label htmlFor="signinPassword">Password</label>
                    <span className="forgot-text">Reset key</span>
                  </div>
                  <input
                    id="signinPassword"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-text"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="submit"
              className="btn-signin-submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading-text">
                  <span className="spinner-dot" /> Authenticating...
                </span>
              ) : (
                `Sign in as ${activeTab === "donor" ? "Donor" : activeTab === "ngo" ? "NGO Partner" : "Admin"} →`
              )}
            </motion.button>
          </form>

          <div className="card-footer-note">
            <span>Security protected by FoodBridge Identity Services</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
