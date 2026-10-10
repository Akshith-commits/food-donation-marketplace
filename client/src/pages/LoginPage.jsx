import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  setCurrentUser,
  HYDERABAD_DONORS,
  HYDERABAD_INDIVIDUAL_DONORS,
  HYDERABAD_NGOS,
} from "../lib/store";
import Logo from "../components/Logo";

const HYDERABAD_AREAS = [
  "Charminar",
  "Secunderabad",
  "Jubilee Hills",
  "Madhapur",
  "Banjara Hills",
  "Gachibowli",
  "Kukatpally",
  "Begumpet",
  "Ameerpet",
  "Hitech City",
];

export default function LoginPage() {
  const navigate = useNavigate();

  // Primary Role: 'donor' | 'ngo' | 'admin'
  const [activeTab, setActiveTab] = useState("donor");

  // Donor Sub-Type: 'business' | 'individual'
  const [donorType, setDonorType] = useState("business");

  // Business Donor state
  const [selectedBusinessId, setSelectedBusinessId] = useState("donor-1");

  // Individual Donor state
  const [selectedIndividualId, setSelectedIndividualId] = useState("ind-1");
  const [individualName, setIndividualName] = useState("Priya Sharma");
  const [individualEmail, setIndividualEmail] = useState("priya.sharma@gmail.com");
  const [individualArea, setIndividualArea] = useState("Banjara Hills");

  // NGO State
  const [selectedNgoId, setSelectedNgoId] = useState("ngo-1");

  // Admin State
  const [adminName, setAdminName] = useState("Operations Administrator");
  const [adminEmail, setAdminEmail] = useState("admin@foodbridge.org");

  // Demo password
  const [demoPasscode, setDemoPasscode] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active objects
  const activeBusiness =
    HYDERABAD_DONORS.find((d) => d.id === selectedBusinessId) || HYDERABAD_DONORS[0];
  const activeNgo =
    HYDERABAD_NGOS.find((n) => n.id === selectedNgoId) || HYDERABAD_NGOS[0];

  // When picking a seeded individual
  const handleSelectIndividual = (id) => {
    setSelectedIndividualId(id);
    if (id === "custom") {
      setIndividualName("");
      setIndividualEmail("");
      setIndividualArea("Banjara Hills");
    } else {
      const match = HYDERABAD_INDIVIDUAL_DONORS.find((ind) => ind.id === id);
      if (match) {
        setIndividualName(match.name);
        setIndividualEmail(match.email);
        setIndividualArea(match.area);
      }
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (activeTab === "donor") {
        if (donorType === "business") {
          setCurrentUser({
            role: "donor",
            donorType: "business",
            name: activeBusiness.name,
            email: activeBusiness.email,
            area: activeBusiness.area,
            address: activeBusiness.address,
          });
        } else {
          setCurrentUser({
            role: "donor",
            donorType: "individual",
            name: individualName.trim() || "Community Donor",
            email: individualEmail.trim() || "donor@community.org",
            area: individualArea,
            address: `${individualArea}, Hyderabad`,
          });
        }
        navigate("/donor");
      } else if (activeTab === "ngo") {
        setCurrentUser({
          role: "ngo",
          name: activeNgo.name,
          email: activeNgo.contact,
          area: activeNgo.area,
          verified: Boolean(activeNgo.verified),
        });
        navigate("/ngo");
      } else if (activeTab === "admin") {
        setCurrentUser({
          role: "admin",
          name: adminName.trim() || "Operations Administrator",
          email: adminEmail.trim() || "admin@foodbridge.org",
        });
        navigate("/admin");
      }
      setIsSubmitting(false);
    }, 250);
  };

  return (
    <div className="signin-split-container">
      {/* Left Column: Authentic Food Photography Hero */}
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
            <span className="editorial-pill">Hyderabad Food Rescue Network</span>
            <h1>Connecting surplus food with local hunger relief in real time.</h1>
            <p>
              From Charminar to Hitech City, commercial kitchens and community donors redirect surplus meals to accredited shelters in under 60 seconds.
            </p>
          </div>

          <div className="signin-stats-pills">
            <div className="pill-item">
              <span className="pill-val">1,150+</span>
              <span className="pill-lbl">Meals Rescued</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-val">6 Zones</span>
              <span className="pill-lbl">Hyderabad Coverage</span>
            </div>
            <div className="pill-divider" />
            <div className="pill-item">
              <span className="pill-val">4 NGOs</span>
              <span className="pill-lbl">Registered Partners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Liquid-Glass Account Selection Card */}
      <div className="signin-right-col">
        <motion.div
          className="signin-glass-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="card-top-header">
            <div className="header-badge-row">
              <span className="live-demo-tag">⚡ Interactive Demo</span>
            </div>
            <h2>Account Access</h2>
            <p>Select your portal role to explore the food-rescue marketplace</p>
          </div>

          {/* Three Primary Roles Segmented Control */}
          <div className="role-tab-switch" role="tablist">
            {[
              { id: "donor", label: "Donor", icon: "🥖" },
              { id: "ngo", label: "NGO Partner", icon: "🤝" },
              { id: "admin", label: "Operations Admin", icon: "🛡️" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`tab-btn-pill ${isActive ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-btn-label">
                    <span className="tab-icon">{tab.icon}</span>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Form Formats */}
          <form onSubmit={handleSignIn} className="signin-form">
            <AnimatePresence mode="wait">
              {/* DONOR TAB */}
              {activeTab === "donor" && (
                <motion.div
                  key="tab-donor"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="tab-fields-wrap"
                >
                  {/* Individual vs Business Switch */}
                  <div className="donor-type-segmented">
                    <button
                      type="button"
                      className={`donor-type-btn ${donorType === "business" ? "active" : ""}`}
                      onClick={() => setDonorType("business")}
                    >
                      <span className="type-icon">🏢</span>
                      <div className="type-text">
                        <strong>Commercial Kitchen</strong>
                        <small>Restaurants, Banquets, Canteens</small>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`donor-type-btn ${donorType === "individual" ? "active" : ""}`}
                      onClick={() => setDonorType("individual")}
                    >
                      <span className="type-icon">👤</span>
                      <div className="type-text">
                        <strong>Individual Donor</strong>
                        <small>Home cooks & Event hosts</small>
                      </div>
                    </button>
                  </div>

                  {donorType === "business" ? (
                    <>
                      <div className="form-group mb-3">
                        <label htmlFor="businessSelect">Seeded Commercial Donor</label>
                        <select
                          id="businessSelect"
                          className="input-select"
                          value={selectedBusinessId}
                          onChange={(e) => setSelectedBusinessId(e.target.value)}
                        >
                          {HYDERABAD_DONORS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name} · {d.category} ({d.area})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="businessEmail">Contact Email</label>
                        <input
                          id="businessEmail"
                          type="email"
                          readOnly
                          value={activeBusiness.email}
                          className="input-text readonly"
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label>Pickup Location</label>
                        <div className="info-chip-static">
                          📍 {activeBusiness.address}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-group mb-3">
                        <label htmlFor="individualPreset">Profile Preset or Custom</label>
                        <select
                          id="individualPreset"
                          className="input-select"
                          value={selectedIndividualId}
                          onChange={(e) => handleSelectIndividual(e.target.value)}
                        >
                          {HYDERABAD_INDIVIDUAL_DONORS.map((ind) => (
                            <option key={ind.id} value={ind.id}>
                              {ind.name} · {ind.bio} ({ind.area})
                            </option>
                          ))}
                          <option value="custom">+ Create Custom Individual Profile</option>
                        </select>
                      </div>

                      <div className="form-row-2 mb-3">
                        <div className="form-group">
                          <label htmlFor="indName">Your Name</label>
                          <input
                            id="indName"
                            type="text"
                            required
                            placeholder="e.g. Priya Sharma"
                            value={individualName}
                            onChange={(e) => setIndividualName(e.target.value)}
                            className="input-text"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="indArea">Hyderabad Zone</label>
                          <select
                            id="indArea"
                            className="input-select"
                            value={individualArea}
                            onChange={(e) => setIndividualArea(e.target.value)}
                          >
                            {HYDERABAD_AREAS.map((a) => (
                              <option key={a} value={a}>
                                {a}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label htmlFor="indEmail">Email Address</label>
                        <input
                          id="indEmail"
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={individualEmail}
                          onChange={(e) => setIndividualEmail(e.target.value)}
                          className="input-text"
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* NGO TAB */}
              {activeTab === "ngo" && (
                <motion.div
                  key="tab-ngo"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="tab-fields-wrap"
                >
                  <div className="form-group mb-3">
                    <label htmlFor="ngoSelect">Registered Relief Organization</label>
                    <select
                      id="ngoSelect"
                      className="input-select"
                      value={selectedNgoId}
                      onChange={(e) => setSelectedNgoId(e.target.value)}
                    >
                      {HYDERABAD_NGOS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name} — {n.verified ? "✓ Verified" : "⚠️ Pending Accreditation"} ({n.area})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="ngo-detail-preview mb-3">
                    <div className="preview-row">
                      <span className="preview-label">Area Focus</span>
                      <span className="preview-val">📍 {activeNgo.area}, Hyderabad</span>
                    </div>
                    <div className="preview-row">
                      <span className="preview-label">Accreditation</span>
                      <span className={`status-pill ${activeNgo.verified ? "status-delivered" : "status-claimed"}`}>
                        {activeNgo.verified ? "Accredited for Instant Claims" : "Pending Verification"}
                      </span>
                    </div>
                    <p className="ngo-desc-sub">{activeNgo.description}</p>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="ngoContact">Contact Representative Email</label>
                    <input
                      id="ngoContact"
                      type="email"
                      readOnly
                      value={activeNgo.contact}
                      className="input-text readonly"
                    />
                  </div>
                </motion.div>
              )}

              {/* ADMIN TAB */}
              {activeTab === "admin" && (
                <motion.div
                  key="tab-admin"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="tab-fields-wrap"
                >
                  <div className="admin-access-callout mb-3">
                    <div className="callout-icon">🛡️</div>
                    <div className="callout-body">
                      <strong>Platform Operations & Dispatch Console</strong>
                      <p>
                        Inspect city-wide meal recovery telemetry, manage active dispatch flows, and accredit grassroots charity partners.
                      </p>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="adminName">Administrator Identity</label>
                    <input
                      id="adminName"
                      type="text"
                      required
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      className="input-text"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="adminEmail">Official Email</label>
                    <input
                      id="adminEmail"
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="input-text"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Passcode field (clear simulated label) */}
            <div className="form-group mb-4">
              <div className="label-row">
                <label htmlFor="demoPass">Demo Security Passcode</label>
                <span className="forgot-text">Any passcode accepted</span>
              </div>
              <input
                id="demoPass"
                type="password"
                value={demoPasscode}
                onChange={(e) => setDemoPasscode(e.target.value)}
                className="input-text"
                autoComplete="current-password"
              />
            </div>

            {/* Submit Action */}
            <motion.button
              type="submit"
              className="btn-signin-submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="btn-loading-text">
                  <span className="spinner-dot" /> Initializing Session...
                </span>
              ) : activeTab === "donor" ? (
                donorType === "business" ? (
                  `Enter as ${activeBusiness.name} →`
                ) : (
                  `Enter as Individual Donor (${individualName || "Community"}) →`
                )
              ) : activeTab === "ngo" ? (
                `Enter as ${activeNgo.name} →`
              ) : (
                "Enter Operations Command Center →"
              )}
            </motion.button>
          </form>

          <div className="card-footer-note">
            <span className="footer-lock-icon">🔒</span>
            <span>Simulated session is stored in your local browser storage for hackathon testing.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
