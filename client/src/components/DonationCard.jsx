import React from "react";
import { motion } from "framer-motion";
import CountdownBadge from "./CountdownBadge";
import StatusTimeline from "./StatusTimeline";
import { getFoodImage } from "../lib/foodImages";

export default function DonationCard({
  item,
  isVerified = true,
  onClaim = null,
  showTimeline = false,
  isOwner = false,
}) {
  const imgSrc = item.imageUrl || getFoodImage(item.foodName, item.category);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="donation-card"
    >
      {/* 1. Food Image with Category & Expiry Badges */}
      <div className="card-image-wrap">
        <img
          src={imgSrc}
          alt={item.foodName}
          loading="lazy"
          className="card-food-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/biryani.jpg";
          }}
        />
        <div className="card-image-gradient" />

        <div className="card-floating-badges">
          <span className="card-category-pill">{item.category}</span>
          <CountdownBadge
            targetTimestamp={item.expiryTimestamp}
            fallbackText={item.expiryTime}
          />
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="card-content-body">
        <div className="card-header-block">
          <h3 className="card-food-title" title={item.foodName}>
            {item.foodName}
          </h3>

          <div className="card-donor-meta">
            <span className="donor-name-text">🏢 {item.donorName}</span>
            <span className="meta-dot">·</span>
            <span className="donor-area-text">📍 {item.area || "Hyderabad"}</span>
          </div>
        </div>

        {/* Quantity & Unit Pill */}
        <div className="card-qty-strip">
          <span className="qty-highlight">{item.quantity}</span>
          <span className="qty-unit-label">{item.unit} available</span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="card-description-text" title={item.description}>
            {item.description}
          </p>
        )}

        {/* Pickup Location */}
        <div className="card-address-row">
          <span className="address-icon">📍</span>
          <span className="address-text" title={item.pickupAddress}>
            {item.pickupAddress}
          </span>
        </div>

        {/* Optional Status Progression Timeline */}
        {showTimeline && (
          <div className="card-timeline-section">
            <StatusTimeline status={item.status} />
          </div>
        )}

        {/* Claimed by banner */}
        {item.claimedByName && (
          <div className="card-claimed-by-row">
            <span className="claimed-icon">🤝</span>
            <span>
              Claimed by <strong>{item.claimedByName}</strong>
            </span>
          </div>
        )}

        {/* 3. Primary Action */}
        {onClaim && (
          <div className="card-action-wrap">
            {isVerified ? (
              <button
                type="button"
                onClick={() => onClaim(item)}
                className="btn-primary w-full"
                aria-label={`Claim ${item.quantity} ${item.unit} of ${item.foodName}`}
              >
                Claim Batch →
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="btn-disabled w-full"
                title="Only verified NGO partners can claim food batches"
              >
                Claim (Verification Required)
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
