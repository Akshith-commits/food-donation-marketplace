import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { getDonations, addDonation, getCurrentUser } from "../lib/store";

const CATEGORIES = ["Bakery", "Cooked Meals", "Produce", "Dairy", "Pantry", "Prepared Food", "Beverages"];
const UNITS = ["portions", "meals", "pieces", "loaves", "boxes", "crates", "kg", "trays"];

export default function DonorDashboard() {
  const currentUser = getCurrentUser() || { name: "Golden Spoon Bakery", role: "donor" };
  const [donations, setDonations] = useState(() => getDonations());
  const [filterView, setFilterView] = useState("my"); // 'my' or 'all'
  const [statusFilter, setStatusFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    foodName: "",
    category: "Cooked Meals",
    quantity: "",
    unit: "meals",
    pickupAddress: "128 Baker Street, Downtown",
    expiryTime: "Today at 9:00 PM",
    description: "",
  });

  const loadDonations = () => {
    setDonations(getDonations());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillSample = () => {
    const samples = [
      {
        foodName: "35 Hearty Pasta & Marinara Trays",
        category: "Cooked Meals",
        quantity: "35",
        unit: "trays",
        pickupAddress: "400 Grand Ave, Suite 10, Convention Center",
        expiryTime: "Tonight at 10:00 PM",
        description: "Freshly prepared vegetarian pasta trays, chilled and foil-sealed with ingredient labels.",
      },
      {
        foodName: "50 Slices Artisan Chocolate Cake & Scones",
        category: "Bakery",
        quantity: "50",
        unit: "pieces",
        pickupAddress: "128 Baker Street, Downtown",
        expiryTime: "Tomorrow at 12:00 PM",
        description: "Packaged bakery items in pastry boxes, ideal for morning shelter breakfast.",
      },
      {
        foodName: "20 Crates of Fresh Garden Salad Bowls",
        category: "Produce",
        quantity: "20",
        unit: "crates",
        pickupAddress: "85 Market Boulevard, Westside",
        expiryTime: "Today at 7:30 PM",
        description: "Washed and sealed mixed green salad bowls with separate vinaigrette cups.",
      },
    ];
    const picked = samples[Math.floor(Math.random() * samples.length)];
    setFormData(picked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.foodName.trim()) {
      alert("Please provide a food name.");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    addDonation({
      ...formData,
      donorName: currentUser.name,
    });

    loadDonations();
    setSuccessMessage(`Successfully listed "${formData.foodName}"! Nearby NGOs can now claim it.`);
    setTimeout(() => setSuccessMessage(""), 5000);

    // Reset form
    setFormData({
      foodName: "",
      category: "Cooked Meals",
      quantity: "",
      unit: "meals",
      pickupAddress: formData.pickupAddress, // keep address convenient
      expiryTime: "Today at 9:00 PM",
      description: "",
    });
  };

  // Filtered donations
  const displayedDonations = donations.filter((item) => {
    const matchOwner = filterView === "my" ? item.donorName === currentUser.name : true;
    const matchStatus = statusFilter === "all" ? true : item.status === statusFilter;
    return matchOwner && matchStatus;
  });

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

  const formatStatusText = (status) => {
    switch (status) {
      case "available":
        return "● Available";
      case "claimed":
        return "● Claimed";
      case "picked_up":
        return "● Picked Up";
      case "delivered":
        return "✓ Delivered";
      default:
        return status;
    }
  };

  return (
    <div className="portal-root">
      <Banner onReset={loadDonations} />
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">Donor Dashboard / Surplus Dispatch</div>
            <h1 className="portal-title">Welcome, {currentUser.name}</h1>
            <p className="portal-subtitle">
              Post surplus food batches in under 60 seconds. Prevent food waste and feed your neighborhood.
            </p>
          </div>
        </div>

        {successMessage && (
          <div className="alert-success">
            <span className="alert-icon">✓</span>
            <span>{successMessage}</span>
          </div>
        )}

        <div className="donor-grid-layout">
          {/* Post Food Form Column */}
          <div className="form-card">
            <div className="form-card-header">
              <div>
                <h2>Post Food Donation</h2>
                <p>Fill out the details below to publish an instant food listing.</p>
              </div>
              <button
                type="button"
                onClick={handleFillSample}
                className="btn-secondary-sm"
                title="Fill sample donation fields"
              >
                ⚡ Fill Sample
              </button>
            </div>

            <form onSubmit={handleSubmit} className="donation-form">
              <div className="form-group">
                <label htmlFor="foodName">Food Name / Batch Title *</label>
                <input
                  id="foodName"
                  name="foodName"
                  type="text"
                  required
                  placeholder="e.g. 50 Fresh Croissants & Pastries"
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
                  <label htmlFor="quantity">Quantity & Unit *</label>
                  <div className="quantity-input-group">
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      required
                      placeholder="Qty"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="input-field qty-number"
                    />
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="select-field qty-unit"
                    >
                      {UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pickupAddress">Pickup Address *</label>
                <input
                  id="pickupAddress"
                  name="pickupAddress"
                  type="text"
                  required
                  placeholder="Street address, building, suite"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiryTime">Best Before / Expiry Time *</label>
                <input
                  id="expiryTime"
                  name="expiryTime"
                  type="text"
                  required
                  placeholder="e.g. Today at 8:00 PM or Oct 11, 2:00 PM"
                  value={formData.expiryTime}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description & Handling Notes</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  placeholder="Add packaging details, allergens (nuts, gluten, dairy), or storage conditions (refrigerated, hot)..."
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea-field"
                />
              </div>

              <button type="submit" className="btn-primary-orange w-full">
                Publish Food Listing →
              </button>
            </form>
          </div>

          {/* Donations List Column */}
          <div className="list-card">
            <div className="list-card-header">
              <div>
                <h2>Donation Listings</h2>
                <p>Track the lifecycle of your posted surplus batches.</p>
              </div>

              <div className="filter-controls">
                <div className="segmented-control">
                  <button
                    type="button"
                    className={`segment-btn ${filterView === "my" ? "active" : ""}`}
                    onClick={() => setFilterView("my")}
                  >
                    My Donations
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
              {displayedDonations.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📦</span>
                  <h3>No donations found</h3>
                  <p>
                    {filterView === "my"
                      ? "You haven't posted any food under this account yet. Fill the form to post your first batch!"
                      : "No donations match the selected status filter."}
                  </p>
                </div>
              ) : (
                displayedDonations.map((item) => (
                  <div key={item.id} className="donation-item-card">
                    <div className="donation-item-top">
                      <div className="donation-item-main">
                        <span className="item-category-tag">{item.category}</span>
                        <h3 className="donation-title">{item.foodName}</h3>
                        <div className="donation-meta-inline">
                          <span className="meta-donor">By {item.donorName}</span>
                          <span className="meta-separator">•</span>
                          <span className="meta-qty">
                            <strong>{item.quantity}</strong> {item.unit}
                          </span>
                        </div>
                      </div>

                      <span className={`status-badge ${getStatusBadgeClass(item.status)}`}>
                        {formatStatusText(item.status)}
                      </span>
                    </div>

                    {item.description && (
                      <p className="donation-desc">{item.description}</p>
                    )}

                    <div className="donation-item-details">
                      <div className="detail-row">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{item.pickupAddress}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-icon">⏰</span>
                        <span className="detail-text">Expires: {item.expiryTime}</span>
                      </div>
                    </div>

                    {item.claimedByName && (
                      <div className="claimed-by-footer">
                        <span className="claim-icon">🤝</span>
                        <span>
                          Claimed by <strong>{item.claimedByName}</strong>
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
