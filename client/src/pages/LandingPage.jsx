import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ScrollHero from "../components/ScrollHero";
import Banner from "../components/Banner";
import { getStats } from "../lib/store";

export default function LandingPage() {
  const navigate = useNavigate();
  const stats = getStats();

  useEffect(() => {
    // Intercept "Donate food" cta button clicks inside the un-modified ScrollHero component
    const handleCtaClick = (e) => {
      const button = e.target.closest(".cta");
      if (button) {
        e.preventDefault();
        e.stopPropagation();
        navigate("/login");
      }
    };

    document.addEventListener("click", handleCtaClick);
    return () => {
      document.removeEventListener("click", handleCtaClick);
    };
  }, [navigate]);

  return (
    <div className="landing-page-root">
      <Banner />
      {/* ScrollHero component as required (MUST NOT BE MODIFIED) */}
      <ScrollHero />

      {/* Existing next section with expanded interactive workflow */}
      <section className="next">
        <div className="next-container">
          <div className="next-header">
            <span className="badge-pill">Zero Waste Mission</span>
            <h2>How it works (next section)</h2>
            <p className="next-subtitle">
              Bridging the gap between surplus commercial food and local community kitchens in real time.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">🥖</div>
              <h3>List in 60 Seconds</h3>
              <p>
                Restaurants, bakeries, and grocers upload surplus batch sizes, storage requirements, and pickup deadlines.
              </p>
              <div className="step-meta">Donor Portal</div>
            </div>

            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">🤝</div>
              <h3>Verified NGOs Claim</h3>
              <p>
                Vetted shelters and food rescue charities receive notifications and claim meals matched to their demand.
              </p>
              <div className="step-meta">NGO Network</div>
            </div>

            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">🚚</div>
              <h3>Pickup & Delivery</h3>
              <p>
                Volunteers handle direct dispatch with status tracking from kitchen counters straight to distribution tables.
              </p>
              <div className="step-meta">Verified Impact</div>
            </div>
          </div>

          {/* Quick interactive demo launchers */}
          <div className="landing-cta-banner">
            <div className="cta-banner-text">
              <h3>Ready to explore the FoodBridge Prototype?</h3>
              <p>
                Test real-time donor submissions, NGO claim workflows, and platform verification stats.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/login" className="btn-primary-orange">
                Launch Interactive Demo →
              </Link>
              <div className="quick-roles-pills">
                <Link to="/login" className="role-pill-link">Donor Portal</Link>
                <Link to="/login" className="role-pill-link">NGO Hub</Link>
                <Link to="/login" className="role-pill-link">Admin View</Link>
              </div>
            </div>
          </div>

          <div className="landing-stats-bar">
            <div className="landing-stat">
              <span className="stat-value">{stats.mealsSaved}+</span>
              <span className="stat-label">Meals Diverted</span>
            </div>
            <div className="stat-divider" />
            <div className="landing-stat">
              <span className="stat-value">{stats.totalDonations}</span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat-divider" />
            <div className="landing-stat">
              <span className="stat-value">{stats.activeNgos}</span>
              <span className="stat-label">Verified NGO Partners</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
