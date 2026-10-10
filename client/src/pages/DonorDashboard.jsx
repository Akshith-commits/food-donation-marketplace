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
    pickupAddress: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
    expiryHours: "3",
    description: "",
  });

  const loadDonations = () => {
    setDonations(getDonations());
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
        area: "Charminar",
        pickupAddress: "Shop 14, Near Gulzar Houz, Charminar, Hyderabad",
        expiryHours: "0.75", // 45 mins -> tests red countdown under 1 hr!
        description: "Freshly packed hot dum biryani with mirchi ka salan in sealed commercial foil containers.",
      },
      {
        foodName: "Vegetable Pulao & Mirchi Ka Salan",
        category: "Cooked Meals",
        quantity: "60",
        unit: "meals",
        area: "Jubilee Hills",
        pickupAddress: "Road No. 36, Jubilee Hills, Hyderabad",
        expiryHours: "3",
        description: "Fresh banquet dinner meal packs, temperature held in thermal containers.",
      },
      {
        foodName: "Irani Chai & Osmania Biscuits",
        category: "Bakery & Tea",
        quantity: "80",
        unit: "packets",
        area: "Secunderabad",
        pickupAddress: "Station Road, Near Clock Tower, Secunderabad",
        expiryHours: "4",
        description: "Osmania butter biscuits and fresh chai flasks ready for distribution.",
      },
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    setFormData(picked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName.trim()) {
      alert("Please enter a food item name.");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter a valid quantity.");
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
    addToast(`Successfully published ${formData.quantity} ${formData.unit} of "${formData.foodName}"!`, "success");

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

  return (
    <div className="portal-root">
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">Kitchen Surplus Dispatch</div>
            <h1 className="portal-title">{currentUser.name}</h1>
            <p className="portal-subtitle">
              Dispatch commercial surplus food to accredited shelters across Hyderabad in minutes.
            </p>
          </div>
        </div>

        {/* My Impact Strip with Count-Up Animation */}
        <motion.div
          className="impact-strip"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="impact-item">
            <span className="impact-icon">🍲</span>
            <div className="impact-data">
              <span className="impact-val">
                <CountUp end={myMealsShared} />
              </span>
              <span className="impact-label">Meals Shared</span>
            </div>
          </div>

          <div className="impact-divider" />

          <div className="impact-item">
            <span className="impact-icon">⚖️</span>
            <div className="impact-data">
              <span className="impact-val">
                <CountUp end={myKgSaved} suffix=" kg" />
              </span>
              <span className="impact-label">Food Waste Prevented</span>
            </div>
          </div>

          <div className="impact-divider" />

          <div className="impact-item">
            <span className="impact-icon">🤝</span>
            <div className="impact-data">
              <span className="impact-val">
                <CountUp end={distinctNgosHelped || 2} />
              </span>
              <span className="impact-label">NGO Shelters Supported</span>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Grid: Form + Donations List */}
        <div className="donor-grid-layout">
          {/* Post Food Form */}
          <div className="form-card">
            <div className="form-card-header">
              <div>
                <h2>Post Surplus Food</h2>
                <p>Submit batch details for immediate rescue dispatch.</p>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="subtle-quickfill-link"
              >
                ⚡ Quick fill
              </button>
            </div>

            <form onSubmit={handleSubmit} className="donation-form">
              <div className="form-group">
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

              <div className="form-row-2">
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

              {/* Fix 8: Quantity & Unit row with min-width: 0 so it never clips */}
              <div className="form-row-qty-fixed">
                <div className="form-group" style={{ minWidth: 0 }}>
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
                    style={{ minWidth: 0, width: "100%" }}
                  />
                </div>

                <div className="form-group" style={{ minWidth: 0 }}>
                  <label htmlFor="unit">Unit *</label>
                  <select
                    id="unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="select-field"
                    style={{ minWidth: 0, width: "100%" }}
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pickupAddress">Pickup Address in {formData.area} *</label>
                <input
                  id="pickupAddress"
                  name="pickupAddress"
                  type="text"
                  required
                  placeholder="Street address, landmark"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiryHours">Expiry Window (Hours) *</label>
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

              <div className="form-group">
                <label htmlFor="description">Handling Instructions & Packaging</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Sealed foil packs, spicy/mild, dietary restrictions, temperature requirements..."
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

          {/* Donations List */}
          <div className="list-card">
            <div className="list-card-header">
              <div>
                <h2>Active Listings</h2>
                <p>Real-time lifecycle tracking of dispatched batches.</p>
              </div>

              <div className="filter-controls">
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
                    All ({donations.length})
                  </button>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select-field select-sm"
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="claimed">Claimed</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <div className="donations-feed">
              <AnimatePresence>
                {displayedDonations.length === 0 ? (
                  <motion.div
                    className="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="empty-icon">🍲</span>
                    <h3>No listings found</h3>
                    <p>Post a food batch using the form on the left to start rescuing meals.</p>
                  </motion.div>
                ) : (
                  displayedDonations.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -16, scale: 0.98 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        borderColor: postedSuccessId === item.id ? "rgba(249, 115, 22, 0.9)" : "var(--border-subtle)",
                      }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className={`donation-item-card ${postedSuccessId === item.id ? "card-highlight-new" : ""}`}
                    >
                      <div className="donor-card-top-flex">
                        <img
                          src={item.imageUrl || getFoodImage(item.foodName, item.category)}
                          alt={item.foodName}
                          className="donor-card-thumb"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/images/biryani.jpg";
                          }}
                        />
                        <div className="donation-item-main">
                          <div className="tag-row-meta">
                            <span className="item-category-tag">{item.category}</span>
                            <span className="area-pill-tag">📍 {item.area || "Hyderabad"}</span>
                          </div>
                          <h3 className="donation-title">{item.foodName}</h3>
                          <div className="donation-meta-inline">
                            <span className="meta-donor">{item.donorName}</span>
                            <span className="meta-separator">•</span>
                            <span className="meta-qty">
                              <strong>{item.quantity}</strong> {item.unit}
                            </span>
                          </div>
                        </div>

                        <CountdownBadge
                          targetTimestamp={item.expiryTimestamp}
                          fallbackText={item.expiryTime}
                        />
                      </div>

                      {item.description && (
                        <p className="donation-desc">{item.description}</p>
                      )}

                      <div className="donation-item-details">
                        <div className="detail-row">
                          <span className="detail-icon">🏢</span>
                          <span className="detail-text">{item.pickupAddress}</span>
                        </div>
                      </div>

                      {/* Status Timeline Component */}
                      <StatusTimeline status={item.status} />

                      {item.claimedByName && (
                        <div className="claimed-by-footer">
                          <span className="claim-icon">🤝</span>
                          <span>
                            Relief partner: <strong>{item.claimedByName}</strong>
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
