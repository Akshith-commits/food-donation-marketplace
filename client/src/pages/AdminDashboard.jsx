import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import {
  getStats,
  getNgos,
  verifyNgo,
  getDonations,
} from "../lib/store";

export default function AdminDashboard() {
  const [stats, setStats] = useState(() => getStats());
  const [ngos, setNgos] = useState(() => getNgos());
  const [donations, setDonations] = useState(() => getDonations());
  const [successBanner, setSuccessBanner] = useState("");

  const loadData = () => {
    setStats(getStats());
    setNgos(getNgos());
    setDonations(getDonations());
  };

  const handleVerify = (ngoId, ngoName) => {
    verifyNgo(ngoId);
    loadData();
    setSuccessBanner(`NGO "${ngoName}" has been successfully verified! They can now claim food donations.`);
    setTimeout(() => setSuccessBanner(""), 5000);
  };

  // Derive recent activity from donations and statuses
  const generateRecentActivity = () => {
    return donations.slice(0, 8).map((d) => {
      let actionText = "";
      let actionType = d.status;
      let timestamp = d.createdAt
        ? new Date(d.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Recent";

      if (d.status === "delivered") {
        actionText = `${d.claimedByName || "NGO"} marked ${d.quantity} ${d.unit} of "${d.foodName}" as delivered.`;
      } else if (d.status === "picked_up") {
        actionText = `${d.claimedByName || "NGO"} picked up "${d.foodName}" from ${d.donorName}.`;
      } else if (d.status === "claimed") {
        actionText = `${d.claimedByName || "NGO"} claimed "${d.foodName}" from ${d.donorName}.`;
      } else {
        actionText = `${d.donorName} published a new listing: ${d.quantity} ${d.unit} of "${d.foodName}".`;
      }

      return {
        id: `act-${d.id}`,
        title: actionText,
        time: timestamp,
        status: actionType,
        donor: d.donorName,
        recipient: d.claimedByName,
      };
    });
  };

  const activityList = generateRecentActivity();

  return (
    <div className="portal-root">
      <Banner onReset={loadData} />
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">Platform Control / Operations</div>
            <h1 className="portal-title">Platform Operations Center</h1>
            <p className="portal-subtitle">
              Monitor network health, verify grassroots NGO partners, and oversee food rescue distribution across the city.
            </p>
          </div>
        </div>

        {successBanner && (
          <div className="alert-success">
            <span className="alert-icon">✓</span>
            <span>{successBanner}</span>
          </div>
        )}

        {/* 4 Stat Cards */}
        <div className="stats-cards-grid">
          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Total Donations</span>
              <span className="stat-icon-pill">📦</span>
            </div>
            <div className="stat-card-number">{stats.totalDonations}</div>
            <div className="stat-card-footer">
              <span className="stat-highlight">100% tracked</span> on blockchain-ready ledger
            </div>
          </div>

          <div className="stat-card stat-card-accent">
            <div className="stat-card-top">
              <span className="stat-card-title">Meals Saved</span>
              <span className="stat-icon-pill">🍲</span>
            </div>
            <div className="stat-card-number">{stats.mealsSaved}</div>
            <div className="stat-card-footer">
              <span className="stat-highlight">≈ {(stats.mealsSaved * 0.45).toFixed(0)} kg</span> CO₂ equivalent diverted
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Delivered</span>
              <span className="stat-icon-pill">✅</span>
            </div>
            <div className="stat-card-number">{stats.delivered}</div>
            <div className="stat-card-footer">
              <span className="stat-highlight">{stats.pickedUpCount}</span> batches currently in transit
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Active NGOs</span>
              <span className="stat-icon-pill">🤝</span>
            </div>
            <div className="stat-card-number">{stats.activeNgos}</div>
            <div className="stat-card-footer">
              <span className="stat-highlight">{ngos.length - stats.activeNgos} pending</span> review
            </div>
          </div>
        </div>

        {/* Main 2-column layout: Verification Table + Activity List */}
        <div className="admin-grid-layout">
          {/* NGO Verification Table Column */}
          <div className="admin-table-card">
            <div className="card-section-header">
              <div>
                <h2>NGO Partner Verification</h2>
                <p>Authorize community relief organizations to claim and distribute surplus food.</p>
              </div>
              <span className="counter-pill">{ngos.length} Registered</span>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>City / Region</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ngos.map((ngo) => (
                    <tr key={ngo.id}>
                      <td>
                        <div className="ngo-table-cell">
                          <strong>{ngo.name}</strong>
                          <span className="ngo-meta-sub">{ngo.description || "Relief charity"}</span>
                        </div>
                      </td>
                      <td>
                        <span className="city-tag">{ngo.city || "Metro"}</span>
                      </td>
                      <td>
                        <span className="contact-text">{ngo.contact}</span>
                      </td>
                      <td>
                        {ngo.verified ? (
                          <span className="badge-status-delivered">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="badge-status-claimed">
                            ⚠️ Pending Review
                          </span>
                        )}
                      </td>
                      <td className="text-right">
                        {ngo.verified ? (
                          <span className="verified-check-label">
                            Authorized
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleVerify(ngo.id, ngo.name)}
                            className="btn-verify"
                          >
                            Verify NGO
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity List Column */}
          <div className="admin-activity-card">
            <div className="card-section-header">
              <div>
                <h2>Recent Activity</h2>
                <p>Real-time platform events across all donor and claim cycles.</p>
              </div>
              <span className="activity-live-indicator">● Live</span>
            </div>

            <div className="activity-timeline">
              {activityList.map((act) => (
                <div key={act.id} className="timeline-item">
                  <div className={`timeline-dot dot-${act.status}`} />
                  <div className="timeline-body">
                    <p className="timeline-text">{act.title}</p>
                    <div className="timeline-meta">
                      <span className="timeline-time">{act.time}</span>
                      <span className={`status-pill status-${act.status}`}>
                        {act.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
