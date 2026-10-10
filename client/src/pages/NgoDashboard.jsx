import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import {
  getDonations,
  claimDonation,
  updateStatus,
  getNgos,
  getCurrentUser,
} from "../lib/store";

export default function NgoDashboard() {
  const currentUser = getCurrentUser() || { name: "Hope Food Bank", role: "ngo" };
  const [donations, setDonations] = useState(() => getDonations());
  const [ngos, setNgos] = useState(() => getNgos());
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [activeTab, setActiveTab] = useState("available"); // 'available' or 'my-claims'

  const loadData = () => {
    setDonations(getDonations());
    setNgos(getNgos());
  };

  // Check if current NGO is verified
  const currentNgoRecord = ngos.find(
    (n) => n.name.toLowerCase() === currentUser.name.toLowerCase()
  );
  // Default to false if found and not verified, true if found and verified, or fallback check
  const isVerified = currentNgoRecord ? Boolean(currentNgoRecord.verified) : true;

  const availableDonations = donations.filter((d) => d.status === "available");
  const myClaims = donations.filter((d) => d.claimedByName === currentUser.name);

  const handleClaim = (donation) => {
    if (!isVerified) {
      alert("Verification required: Your NGO account is pending administrative approval. You cannot claim donations until verified.");
      return;
    }

    claimDonation(donation.id, currentUser.name);
    loadData();
    setFeedbackMsg(`Successfully claimed "${donation.foodName}"! Added to My Claims.`);
    setTimeout(() => setFeedbackMsg(""), 5000);
  };

  const handleStatusUpdate = (donationId, newStatus, foodName) => {
    updateStatus(donationId, newStatus);
    loadData();
    const actionLabel = newStatus === "picked_up" ? "marked as Picked Up" : "marked as Delivered";
    setFeedbackMsg(`Status updated: "${foodName}" is now ${actionLabel}!`);
    setTimeout(() => setFeedbackMsg(""), 5000);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "available":
        return "badge-status-available";
      case "claimed":
        return "badge-status-claimed";
      case "picked_up":
        return "badge-status-pickedup";
      case "delivered":
        return "badge-status-delivered";
      default:
        return "badge-status-default";
    }
  };

  return (
    <div className="portal-root">
      <Banner onReset={loadData} />
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">NGO Network Hub / Food Rescue Feed</div>
            <h1 className="portal-title">Welcome, {currentUser.name}</h1>
            <p className="portal-subtitle">
              Claim surplus meals from local commercial donors and coordinate volunteer distribution.
            </p>
          </div>

          <div className="ngo-status-pill-container">
            {isVerified ? (
              <div className="badge-verified">
                <span className="badge-icon">✓</span>
                <span>Verified NGO Partner</span>
              </div>
            ) : (
              <div className="badge-unverified">
                <span className="badge-icon">⚠️</span>
                <span>Verification Pending</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Warning for unverified NGOs */}
        {!isVerified && (
          <div className="verification-warning-banner">
            <div className="warning-left">
              <span className="warning-icon">⚠️</span>
              <div>
                <strong>Account Pending Verification</strong>
                <p>
                  Your organization (<strong>{currentUser.name}</strong>) is currently unverified. Only accredited NGOs can claim active food donations.
                </p>
              </div>
            </div>
            <div className="warning-right">
              <Link to="/admin" className="btn-secondary-sm">
                Go to Admin Portal to Verify →
              </Link>
            </div>
          </div>
        )}

        {feedbackMsg && (
          <div className="alert-success">
            <span className="alert-icon">✓</span>
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="ngo-nav-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "available" ? "active" : ""}`}
            onClick={() => setActiveTab("available")}
          >
            Available Surplus Meals ({availableDonations.length})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "my-claims" ? "active" : ""}`}
            onClick={() => setActiveTab("my-claims")}
          >
            My Claims & Delivery Tracking ({myClaims.length})
          </button>
        </div>

        {/* Available Donations Grid View */}
        {activeTab === "available" && (
          <section className="ngo-section">
            <div className="section-header-row">
              <div>
                <h2>Live Available Donations</h2>
                <p>Real-time surplus batches posted by restaurants, supermarkets, and catering halls.</p>
              </div>
              <span className="feed-pulse-indicator">
                <span className="pulse-dot" /> Live Feed
              </span>
            </div>

            {availableDonations.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🥗</span>
                <h3>No available donations right now</h3>
                <p>All active listings have been claimed. Check back shortly or switch to Donor to post a new batch!</p>
              </div>
            ) : (
              <div className="donations-grid">
                {availableDonations.map((item) => (
                  <div key={item.id} className="ngo-donation-card">
                    <div className="card-top">
                      <span className="item-category-tag">{item.category}</span>
                      <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                        ● Available
                      </span>
                    </div>

                    <h3 className="card-food-name">{item.foodName}</h3>

                    <div className="card-donor-pill">
                      <span className="donor-icon">🏢</span>
                      <span>{item.donorName}</span>
                    </div>

                    <div className="card-quantity-badge">
                      <span className="qty-val">{item.quantity}</span>
                      <span className="qty-unit">{item.unit} available</span>
                    </div>

                    {item.description && (
                      <p className="card-description">{item.description}</p>
                    )}

                    <div className="card-meta-list">
                      <div className="meta-row">
                        <span className="meta-icon">📍</span>
                        <span className="meta-val">{item.pickupAddress}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-icon">⏰</span>
                        <span className="meta-val">Expires: {item.expiryTime}</span>
                      </div>
                    </div>

                    <div className="card-action-footer">
                      {isVerified ? (
                        <button
                          type="button"
                          onClick={() => handleClaim(item)}
                          className="btn-claim"
                        >
                          Claim Donation →
                        </button>
                      ) : (
                        <div className="claim-disabled-wrap">
                          <button
                            type="button"
                            disabled
                            className="btn-claim-disabled"
                            title="Only verified NGOs can claim food"
                          >
                            Claim (Verification Required)
                          </button>
                          <span className="disabled-hint">Pending Admin Approval</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* My Claims View */}
        {activeTab === "my-claims" && (
          <section className="ngo-section">
            <div className="section-header-row">
              <div>
                <h2>My Claims & Logistics</h2>
                <p>Manage pickup dispatch and verify delivery for your organization's claimed donations.</p>
              </div>
              <span className="claims-count-badge">{myClaims.length} Total Claims</span>
            </div>

            {myClaims.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🚚</span>
                <h3>No claims yet</h3>
                <p>You haven't claimed any donations yet. Visit the Available tab to claim surplus meals for your shelter.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("available")}
                  className="btn-primary-orange mt-4"
                >
                  Browse Available Food →
                </button>
              </div>
            ) : (
              <div className="my-claims-list">
                {myClaims.map((item) => (
                  <div key={item.id} className="claim-card">
                    <div className="claim-card-main">
                      <div className="claim-card-header">
                        <div className="claim-badges">
                          <span className="item-category-tag">{item.category}</span>
                          <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                            {item.status === "claimed" && "● Claimed (Awaiting Pickup)"}
                            {item.status === "picked_up" && "● Picked Up (In Transit)"}
                            {item.status === "delivered" && "✓ Delivered"}
                          </span>
                        </div>
                        <h3 className="claim-title">{item.foodName}</h3>
                        <p className="claim-donor-text">
                          Provided by <strong>{item.donorName}</strong> •{" "}
                          <strong>{item.quantity}</strong> {item.unit}
                        </p>
                      </div>

                      {item.description && (
                        <p className="claim-description">{item.description}</p>
                      )}

                      <div className="claim-details-grid">
                        <div className="claim-detail-box">
                          <span className="detail-box-label">Pickup Address</span>
                          <span className="detail-box-val">📍 {item.pickupAddress}</span>
                        </div>
                        <div className="claim-detail-box">
                          <span className="detail-box-label">Pickup Deadline</span>
                          <span className="detail-box-val">⏰ {item.expiryTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="claim-actions-col">
                      <span className="actions-header">Status Actions</span>
                      {item.status === "claimed" && (
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(item.id, "picked_up", item.foodName)}
                          className="btn-status-action btn-pickup"
                        >
                          📦 Mark Picked Up
                        </button>
                      )}

                      {item.status === "picked_up" && (
                        <button
                          type="button"
                          onClick={() => handleStatusUpdate(item.id, "delivered", item.foodName)}
                          className="btn-status-action btn-deliver"
                        >
                          ✅ Mark Delivered
                        </button>
                      )}

                      {item.status === "delivered" && (
                        <div className="delivered-complete-badge">
                          <span className="check-icon">✓</span>
                          <span>Delivery Complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
