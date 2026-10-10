import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { getDonations, addDonation, getCurrentUser } from "../lib/store";
import StatusTimeline from "../components/StatusTimeline";
import CountdownBadge from "../components/CountdownBadge";
import CountUp from "../components/CountUp";
import { useToast } from "../components/useToast";
import { getFoodImage } from "../lib/foodImages";

const CATEGORIES = [
  "Cooked Meals",
  "Biryani & Mughlai",
  "South Indian Tiffins",
  "Bakery & Tea",
  "Desserts",
  "Produce",
];

const UNITS = ["plates", "meals", "packets", "kg"];

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

export default function DonorDashboard() {
  const currentUser = getCurrentUser() || {
    name: "Charminar Biryani House",
    role: "donor",
    donorType: "business",
    area: "Charminar",
  };
  const { addToast } = useToast();

  const [donations, setDonations] = useState(() => getDonations());
  const [filterView, setFilterView] = useState("my"); // 'my' or 'all'
  const [statusFilter, setStatusFilter] = useState("all");
  const [postedSuccessId, setPostedSuccessId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    foodName: "",
    category: "Cooked Meals",
    quantity: "",
    unit: "plates",
    area: currentUser.area || "Charminar",
    pickupAddress: currentUser.address || `${currentUser.area || "Charminar"}, Hyderabad`,
    expiryHours: "3",
    description: "",
  });

  const loadDonations = () => {
    setDonations(getDonations());
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickFill = (e) => {
    e.preventDefault();
    const samples = [
      {
        foodName: "Hyderabadi Chicken Dum Biryani",
        category: "Biryani & Mughlai",
        quantity: "45",
        unit: "plates",
        area: currentUser.area || "Charminar",
        pickupAddress: currentUser.address || "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
        expiryHours: "0.75", // 45 mins -> tests red countdown under 1 hr!
        description: "Freshly packed hot dum biryani with mirchi ka salan in sealed commercial foil containers.",
      },
      {
        foodName: "Vegetable Pulao & Mirchi Ka Salan",
        category: "Cooked Meals",
        quantity: "60",
        unit: "meals",
        area: currentUser.area || "Jubilee Hills",
        pickupAddress: currentUser.address || "Road No. 36, Jubilee Hills, Hyderabad",
        expiryHours: "2.5",
        description: "Fresh banquet dinner meal packs, temperature held in thermal containers.",
      },
      {
        foodName: "Irani Chai & Osmania Biscuits",
        category: "Bakery & Tea",
        quantity: "80",
        unit: "packets",
        area: currentUser.area || "Secunderabad",
        pickupAddress: currentUser.address || "Station Road, Near Clock Tower, Secunderabad",
        expiryHours: "4",
        description: "Osmania butter biscuits and fresh chai flasks ready for distribution.",
      },
      {
        foodName: "Steamed Idli & Sambar Packs",
        category: "South Indian Tiffins",
        quantity: "90",
        unit: "plates",
        area: currentUser.area || "Madhapur",
        pickupAddress: currentUser.address || "Plot 82, Main Road, Madhapur, Hitech City",
        expiryHours: "1.5",
        description: "Steaming hot idlis packed with hot lentil sambar and coconut chutney.",
      },
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    setFormData(picked);
    addToast("Loaded preset sample batch!", "info");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName.trim()) {
      addToast("Please enter a food item or dish name.", "warning");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      addToast("Please enter a valid quantity.", "warning");
      return;
    }

    const hrs = parseFloat(formData.expiryHours) || 3;
    const targetTimestamp = Date.now() + Math.round(hrs * 3600 * 1000);

    const newDonation = addDonation({
      foodName: formData.foodName,
      category: formData.category,
      quantity: formData.quantity,
      unit: formData.unit,
      area: formData.area,
      pickupAddress: formData.pickupAddress,
      expiryTimestamp: targetTimestamp,
      expiryTime: hrs < 1 ? "Under 1 hour" : `In ${hrs} hours`,
      description: formData.description,
      donorName: currentUser.name,
    });

    loadDonations();
    setPostedSuccessId(newDonation.id);
    addToast(`Successfully listed ${formData.quantity} ${formData.unit} of "${formData.foodName}"!`, "success");

    // Reset form fields
    setFormData({
      foodName: "",
      category: "Cooked Meals",
      quantity: "",
      unit: "plates",
      area: formData.area,
      pickupAddress: formData.pickupAddress,
      expiryHours: "3",
      description: "",
    });

    setTimeout(() => setPostedSuccessId(null), 4000);
  };

  // Filtered donations
  const displayedDonations = donations.filter((item) => {
    const matchOwner = filterView === "my" ? item.donorName === currentUser.name : true;
    const matchStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchOwner && matchStatus;
  });

  // Calculate my impact metrics
  const myTotalDonations = donations.filter((d) => d.donorName === currentUser.name);
  const myMealsShared = myTotalDonations.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
  const myKgSaved = Math.round(myMealsShared * 0.42);
  const distinctNgosHelped = new Set(
    myTotalDonations.filter((d) => d.claimedByName).map((d) => d.claimedByName)
  ).size;

  const isIndividual = currentUser.donorType === "individual";

  return (
    <div className="portal-root">
      <Navbar />

      <main className="portal-content">
        {/* Warm Visual Editorial Header */}
        <div className="portal-header">
          <div className="header-text-block">
            <div className="portal-breadcrumb">
              Food Rescue Marketplace / Donor Portal
            </div>
            <div className="header-title-row">
              <h1 className="portal-title">
                {getGreeting()}, {currentUser.name}
              </h1>
              <span className={`donor-profile-badge ${isIndividual ? "badge-ind" : "badge-biz"}`}>
                {isIndividual ? "👤 Community Donor" : "🏢 Commercial Kitchen"}
              </span>
            </div>
            <p className="portal-subtitle">
              Dispatch surplus meals to accredited shelters across Hyderabad in under 60 seconds.
            </p>
          </div>
          <div className="header-meta-pill">
            <span className="live-dot" />
            <span>Zone: <strong>{currentUser.area || "Hyderabad"}</strong></span>
          </div>
        </div>

        {/* 3 Refined Impact Metric Glass Cards */}
        <div className="impact-cards-grid">
          <motion.div
            className="impact-glass-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="card-icon-wrap icon-orange">🍲</div>
            <div className="card-stat-wrap">
              <span className="stat-metric">
                <CountUp end={myMealsShared} />
              </span>
              <span className="stat-label">Meals Shared in Hyderabad</span>
            </div>
          </motion.div>

          <motion.div
            className="impact-glass-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="card-icon-wrap icon-amber">⚖️</div>
            <div className="card-stat-wrap">
              <span className="stat-metric">
                <CountUp end={myKgSaved} suffix=" kg" />
              </span>
              <span className="stat-label">Food Waste Prevented</span>
            </div>
          </motion.div>

          <motion.div
            className="impact-glass-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="card-icon-wrap icon-emerald">🤝</div>
            <div className="card-stat-wrap">
              <span className="stat-metric">
                <CountUp end={distinctNgosHelped || 2} />
              </span>
              <span className="stat-label">NGO Shelters Supported</span>
            </div>
          </motion.div>
        </div>

        {/* Two-Column Layout: Compact Post Food Form + Active Listings */}
        <div className="donor-grid-layout">
          {/* Form Card: Frosted Glass Panel */}
          <div className="donor-form-panel">
            <div className="panel-header-row">
              <div>
                <h2>Post Surplus Food</h2>
                <p>Enter batch details for immediate shelter dispatch.</p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="btn-quickfill"
                title="Populate realistic demo surplus food"
              >
                ⚡ Quick fill
              </button>
            </div>

            <form onSubmit={handleSubmit} className="donation-form-body">
              <div className="form-group mb-3">
                <label htmlFor="foodName">Food Item / Dish *</label>
                <input
                  id="foodName"
                  name="foodName"
                  type="text"
                  required
                  placeholder="e.g. Hyderabadi Chicken Dum Biryani"
                  value={formData.foodName}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-row-2 mb-3">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select-field"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="area">Hyderabad Area *</label>
                  <select
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="select-field"
                  >
                    {HYDERABAD_AREAS.map((ar) => (
                      <option key={ar} value={ar}>
                        {ar}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity & Unit Row */}
              <div className="form-row-2 mb-3">
                <div className="form-group">
                  <label htmlFor="quantity">Quantity *</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 50"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unit">Unit *</label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="select-field"
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="pickupAddress">Pickup Address in {formData.area} *</label>
                <input
                  id="pickupAddress"
                  name="pickupAddress"
                  type="text"
                  required
                  placeholder="Street address, building, landmark"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="expiryHours">Safe Expiry Window *</label>
                <select
                  id="expiryHours"
                  name="expiryHours"
                  value={formData.expiryHours}
                  onChange={handleChange}
                  className="select-field"
                >
                  <option value="0.75">45 Minutes (Critical / Immediate)</option>
                  <option value="1.5">1.5 Hours</option>
                  <option value="3">3 Hours</option>
                  <option value="5">5 Hours</option>
                  <option value="8">8 Hours</option>
                </select>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description">Packaging & Handling Notes</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Sealed foil packs, mild spice level, temperature held..."
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea-field"
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary-orange w-full"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                Publish Surplus Batch →
              </motion.button>
            </form>
          </div>

          {/* Active Listings Column */}
          <div className="donor-listings-panel">
            <div className="panel-header-row">
              <div>
                <h2>Dispatch Listings</h2>
                <p>Lifecycle tracking for posted surplus batches.</p>
              </div>

              <div className="segmented-control">
                <button
                  type="button"
                  className={`segment-btn ${filterView === "my" ? "active" : ""}`}
                  onClick={() => setFilterView("my")}
                >
                  My Listings ({myTotalDonations.length})
                </button>
                <button
                  type="button"
                  className={`segment-btn ${filterView === "all" ? "active" : ""}`}
                  onClick={() => setFilterView("all")}
                >
                  All Hyderabad ({donations.length})
                </button>
              </div>
            </div>

            {/* Filter by Status Pills */}
            <div className="status-filter-pills-row">
              {[
                { id: "all", label: "All Statuses" },
                { id: "available", label: "Available" },
                { id: "claimed", label: "Claimed" },
                { id: "picked_up", label: "In Transit" },
                { id: "delivered", label: "Delivered" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  className={`status-chip-btn ${statusFilter === pill.id ? "active" : ""}`}
                  onClick={() => setStatusFilter(pill.id)}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* List Cards Feed */}
            <div className="donor-cards-feed">
              {displayedDonations.length === 0 ? (
                <div className="donor-empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No donation listings found</h3>
                  <p>
                    {filterView === "my"
                      ? "You haven't posted any surplus batches matching this filter yet."
                      : "No listings in Hyderabad currently match the selected status."}
                  </p>
                  <button
                    type="button"
                    onClick={handleQuickFill}
                    className="btn-secondary-sm mt-3"
                  >
                    ⚡ Populate with Sample Batch
                  </button>
                </div>
              ) : (
                displayedDonations.map((item) => {
                  const foodImg = getFoodImage(item.foodName, item.category);
                  const isRecentlyPosted = postedSuccessId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      className={`donor-listing-card ${isRecentlyPosted ? "card-highlight-glow" : ""}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="listing-card-main">
                        <div className="listing-thumb-wrap">
                          <img
                            src={foodImg}
                            alt={item.foodName}
                            loading="lazy"
                            className="listing-thumb"
                          />
                          <span className={`status-overlay-tag status-${item.status}`}>
                            {item.status.replace("_", " ")}
                          </span>
                        </div>

                        <div className="listing-content">
                          <div className="listing-top-meta">
                            <span className="food-category-tag">{item.category}</span>
                            <CountdownBadge
                              expiryTimestamp={item.expiryTimestamp}
                              expiryTime={item.expiryTime}
                            />
                          </div>

                          <h3 className="listing-title">{item.foodName}</h3>

                          <div className="listing-sub-meta">
                            <span className="qty-tag">
                              📦 {item.quantity} {item.unit}
                            </span>
                            <span className="location-tag">
                              📍 {item.area}
                            </span>
                            {item.claimedByName && (
                              <span className="claimant-tag">
                                🤝 Claimed by <strong>{item.claimedByName}</strong>
                              </span>
                            )}
                          </div>

                          {item.description && (
                            <p className="listing-desc">{item.description}</p>
                          )}
                        </div>
                      </div>

                      {/* Status Lifecycle Progress Bar */}
                      <div className="listing-timeline-strip">
                        <StatusTimeline status={item.status} />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
