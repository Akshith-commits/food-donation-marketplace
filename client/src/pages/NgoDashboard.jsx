import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  getDonations,
  claimDonation,
  updateStatus,
  getNgos,
  getCurrentUser,
} from "../lib/store";
import CountdownBadge from "../components/CountdownBadge";
import StatusTimeline from "../components/StatusTimeline";
import DonationMap from "../components/DonationMap";
import DonationCard from "../components/DonationCard";
import { useToast } from "../components/useToast";
import { getFoodImage } from "../lib/foodImages";

const CATEGORY_CHIPS = ["All Categories", "Cooked Meals", "Biryani & Mughlai", "South Indian Tiffins", "Bakery & Tea", "Dessert"];
const AREA_CHIPS = ["All Areas", "Charminar", "Secunderabad", "Jubilee Hills", "Madhapur", "Banjara Hills", "Gachibowli", "Kukatpally", "Begumpet", "Ameerpet", "Hitech City"];

export default function NgoDashboard() {
  const currentUser = getCurrentUser() || {
    name: "Hyderabad Food Rescue Foundation",
    role: "ngo",
    area: "Ameerpet",
    verified: true,
  };
  const { addToast } = useToast();

  const [donations, setDonations] = useState(() => getDonations());
  const [ngos, setNgos] = useState(() => getNgos());
  const [activeTab, setActiveTab] = useState("available"); // 'available' or 'my-claims'
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'map'

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedArea, setSelectedArea] = useState("All Areas");

  // Confirmation Modal State
  const [claimModalItem, setClaimModalItem] = useState(null);

  const loadData = () => {
    setDonations(getDonations());
    setNgos(getNgos());
  };

  // Check if this NGO is verified in persistent store
  const persistentNgo = ngos.find(
    (n) => (currentUser.id && n.id === currentUser.id) ||
           n.name.toLowerCase() === currentUser.name.toLowerCase()
  );
  const isVerified = persistentNgo ? Boolean(persistentNgo.verified) : Boolean(currentUser.verified);

  const availableDonations = donations.filter((d) => d.status === "available");
  const myClaims = donations.filter((d) => d.claimedByName === currentUser.name);

  // Filter available items
  const filteredAvailable = availableDonations.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      item.foodName.toLowerCase().includes(q) ||
      item.donorName.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q));

    const matchCategory =
      selectedCategory === "All Categories" ||
      item.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchArea =
      selectedArea === "All Areas" ||
      item.area.toLowerCase() === selectedArea.toLowerCase();

    return matchQuery && matchCategory && matchArea;
  });

  const handleOpenClaimModal = (item) => {
    if (!isVerified) {
      addToast("Your NGO account is pending administrative verification.", "warning");
      return;
    }
    setClaimModalItem(item);
  };

  const handleConfirmClaim = () => {
    if (!claimModalItem) return;
    claimDonation(claimModalItem.id, currentUser.name);
    loadData();
    addToast(`Successfully claimed "${claimModalItem.foodName}"! Added to My Claims.`, "success");
    setClaimModalItem(null);
  };

  const handleStatusUpdate = (donationId, newStatus, foodName) => {
    updateStatus(donationId, newStatus);
    loadData();
    const actionLabel = newStatus === "picked_up" ? "marked as Picked Up" : "marked as Delivered";
    addToast(`"${foodName}" has been ${actionLabel}!`, "success");
  };

  return (
    <div className="portal-root">
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">NGO Relief Network Hub / Hyderabad Feed</div>
            <h1 className="portal-title">{currentUser.name}</h1>
            <p className="portal-subtitle">
              Coordinate surplus food rescue and direct delivery to shelters and community kitchens across Hyderabad.
            </p>
          </div>

          <div className="ngo-header-status">
            {isVerified ? (
              <div className="badge-verified">
                <span className="badge-icon">✓</span>
                <span>Verified Partner</span>
              </div>
            ) : (
              <div className="badge-unverified">
                <span className="badge-icon">⚠️</span>
                <span>Verification Pending</span>
              </div>
            )}
          </div>
        </div>

        {/* Unverified Warning Banner */}
        {!isVerified && (
          <motion.div
            className="verification-warning-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="warning-left">
              <span className="warning-icon">⚠️</span>
              <div>
                <strong>Organization Pending Verification</strong>
                <p>
                  <strong>{currentUser.name}</strong> is currently pending compliance review. Only accredited NGOs can claim active food batches.
                </p>
              </div>
            </div>
            <div className="warning-right">
              <Link to="/admin" className="btn-secondary-sm">
                Switch to Admin Portal to Verify →
              </Link>
            </div>
          </motion.div>
        )}

        {/* Section A5: Polished Segmented Control Tabs */}
        <div className="ngo-segmented-control-container">
          <div className="ngo-segmented-tabs" role="tablist" aria-label="Donation Views">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "available"}
              className={`segmented-tab-btn ${activeTab === "available" ? "active" : ""}`}
              onClick={() => setActiveTab("available")}
            >
              <span className="tab-btn-text">Available Surplus Meals</span>
              <span className="tab-count-badge">{availableDonations.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "my-claims"}
              className={`segmented-tab-btn ${activeTab === "my-claims" ? "active" : ""}`}
              onClick={() => setActiveTab("my-claims")}
            >
              <span className="tab-btn-text">My Claims & Active Dispatches</span>
              <span className="tab-count-badge">{myClaims.length}</span>
            </button>
          </div>
        </div>

        {/* AVAILABLE DONATIONS TAB */}
        {activeTab === "available" && (
          <section className="ngo-section">
            {/* Search and Filters Toolbar */}
            <div className="ngo-filter-toolbar">
              <div className="search-input-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search dish, kitchen, or Hyderabad area (e.g. Biryani, Charminar)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  aria-label="Search donations"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Grid / Map View Toggle */}
              <div className="view-toggle-wrap">
                <button
                  type="button"
                  className={`toggle-view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                  aria-pressed={viewMode === "grid"}
                >
                  <span>▦ Grid</span>
                </button>
                <button
                  type="button"
                  className={`toggle-view-btn ${viewMode === "map" ? "active" : ""}`}
                  onClick={() => setViewMode("map")}
                  title="Map View"
                  aria-pressed={viewMode === "map"}
                >
                  <span>🗺️ Map</span>
                </button>
              </div>
            </div>

            {/* Filter Chips (Requirement A6: Clean wrapping & orange active states) */}
            <div className="chips-container-row">
              <div className="chip-group-wrapper">
                <span className="chip-group-label">Category:</span>
                <div className="chips-flex-wrap">
                  {CATEGORY_CHIPS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="chip-group-wrapper">
                <span className="chip-group-label">Area:</span>
                <div className="chips-flex-wrap">
                  {AREA_CHIPS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      className={`filter-chip ${selectedArea === area ? "active" : ""}`}
                      onClick={() => setSelectedArea(area)}
                      aria-pressed={selectedArea === area}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode: Map or Grid */}
            {viewMode === "map" ? (
              <div className="map-view-wrapper mt-4">
                <div className="map-header-notice">
                  <span>📍 Showing {filteredAvailable.length} available surplus batches on Hyderabad Map</span>
                </div>
                <DonationMap
                  donations={filteredAvailable}
                  isVerified={isVerified}
                  onClaimClick={handleOpenClaimModal}
                />
              </div>
            ) : (
              /* Section B: Responsive 3-col Grid of Donation Cards with proper Hierarchy & Images */
              <div className="donations-grid mt-4">
                <AnimatePresence>
                  {filteredAvailable.length === 0 ? (
                    <div className="empty-state w-full" style={{ gridColumn: "1 / -1" }}>
                      <span className="empty-icon">🔍</span>
                      <h3>No available donations match filters</h3>
                      <p>Try clearing your search query or selecting "All Categories" and "All Areas".</p>
                    </div>
                  ) : (
                    filteredAvailable.map((item) => (
                      <DonationCard
                        key={item.id}
                        item={item}
                        isVerified={isVerified}
                        onClaim={handleOpenClaimModal}
                      />
                    ))
                  )}
                </AnimatePresence>
              </div>
            )}
          </section>
        )}

        {/* MY CLAIMS TAB */}
        {activeTab === "my-claims" && (
          <section className="ngo-section">
            <div className="section-header-row">
              <div>
                <h2>My Claims & Dispatches</h2>
                <p>Track pickup logistics and verify distribution to community shelters.</p>
              </div>
              <span className="claims-count-badge">{myClaims.length} Total Claims</span>
            </div>

            {myClaims.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🚚</span>
                <h3>No active claims yet</h3>
                <p>Browse available food batches and click "Claim Batch" to organize a pickup.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("available")}
                  className="btn-primary mt-4"
                >
                  Browse Available Food →
                </button>
              </div>
            ) : (
              <div className="my-claims-list">
                <AnimatePresence>
                  {myClaims.map((item) => {
                    const imgSrc = item.imageUrl || getFoodImage(item.foodName, item.category);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        className="claim-card"
                      >
                        {/* Food Image Thumbnail */}
                        <div className="claim-thumb-container">
                          <img
                            src={imgSrc}
                            alt={item.foodName}
                            loading="lazy"
                            className="claim-thumb-img"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/images/biryani.jpg";
                            }}
                          />
                        </div>

                        <div className="claim-card-main">
                          <div className="claim-card-header">
                            <div className="claim-badges">
                              <span className="item-category-tag">{item.category}</span>
                              <span className="area-pill-tag">📍 {item.area}</span>
                            </div>
                            <h3 className="claim-title">{item.foodName}</h3>
                            <p className="claim-donor-text">
                              From <strong>{item.donorName}</strong> •{" "}
                              <strong className="text-orange">{item.quantity}</strong> {item.unit}
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
                              <span className="detail-box-label">Time Status</span>
                              <CountdownBadge
                                targetTimestamp={item.expiryTimestamp}
                                fallbackText={item.expiryTime}
                              />
                            </div>
                          </div>

                          {/* Status progression bar */}
                          <div className="mt-3">
                            <StatusTimeline status={item.status} />
                          </div>
                        </div>

                        <div className="claim-actions-col">
                          <span className="actions-header">Dispatch Actions</span>
                          {item.status === "claimed" && (
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(item.id, "picked_up", item.foodName)}
                              className="btn-pickup"
                            >
                              📦 Mark Picked Up
                            </button>
                          )}

                          {item.status === "picked_up" && (
                            <button
                              type="button"
                              onClick={() => handleStatusUpdate(item.id, "delivered", item.foodName)}
                              className="btn-deliver"
                            >
                              ✅ Mark Delivered
                            </button>
                          )}

                          {item.status === "delivered" && (
                            <div className="delivered-complete-badge">
                              <span className="check-icon">✓</span>
                              <span>Distributed to Shelter</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Claim Confirmation Modal */}
      <AnimatePresence>
        {claimModalItem && (
          <div className="modal-backdrop" onClick={() => setClaimModalItem(null)}>
            <motion.div
              className="modal-dialog-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Confirm Food Rescue Claim</h3>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setClaimModalItem(null)}
                  aria-label="Close modal"
                >
                  ×
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-desc">
                  Are you ready to dispatch volunteers or transport for this surplus batch?
                </p>

                <div className="modal-item-summary">
                  <div className="modal-item-title">{claimModalItem.foodName}</div>
                  <div className="modal-item-meta">
                    <span>🏢 {claimModalItem.donorName}</span>
                    <span>📍 {claimModalItem.area}</span>
                  </div>
                  <div className="modal-item-qty">
                    <strong>{claimModalItem.quantity}</strong> {claimModalItem.unit}
                  </div>
                  <div className="modal-item-address">
                    Address: {claimModalItem.pickupAddress}
                  </div>
                </div>

                <p className="modal-note">
                  Once claimed, the donor kitchen will be notified to hold this batch for {currentUser.name}.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setClaimModalItem(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleConfirmClaim}
                >
                  Confirm Claim & Dispatch →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
