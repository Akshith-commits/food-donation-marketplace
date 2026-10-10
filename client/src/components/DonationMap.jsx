import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getFoodImage } from "../lib/foodImages";

// Custom Leaflet DivIcon with orange FoodBridge styling
const createMarkerIcon = (category) => {
  let emoji = "🍲";
  if (category?.includes("Bakery")) emoji = "🥖";
  if (category?.includes("Dessert")) emoji = "🍯";

  return L.divIcon({
    className: "leaflet-fb-marker",
    html: `<div class="fb-pin-pulse">
            <div class="fb-pin-inner">${emoji}</div>
          </div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

export default function DonationMap({ donations, isVerified, onClaimClick }) {
  // Center of Hyderabad
  const hyderabadCenter = [17.4065, 78.4350];

  return (
    <div className="donation-map-container">
      <MapContainer
        center={hyderabadCenter}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%", background: "#09090b" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {donations.map((item) => {
          if (!item.lat || !item.lng) return null;
          const imgSrc = item.imageUrl || getFoodImage(item.foodName, item.category);

          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={createMarkerIcon(item.category)}
            >
              <Popup className="fb-map-popup">
                <div className="map-popup-card">
                  <div className="popup-thumb-wrap">
                    <img
                      src={imgSrc}
                      alt={item.foodName}
                      className="popup-thumb-img"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/images/biryani.jpg";
                      }}
                    />
                    <span className="popup-category">{item.category}</span>
                  </div>

                  <div className="popup-body">
                    <h4 className="popup-title">{item.foodName}</h4>
                    <div className="popup-donor">{item.donorName} · <strong>{item.area}</strong></div>
                    <div className="popup-qty">
                      <strong>{item.quantity}</strong> {item.unit} available
                    </div>
                    <p className="popup-address">📍 {item.pickupAddress}</p>

                    <div className="popup-action-wrap">
                      {isVerified ? (
                        <button
                          type="button"
                          className="btn-primary w-full"
                          style={{ padding: "0.55rem", fontSize: "0.82rem" }}
                          onClick={() => onClaimClick(item)}
                        >
                          Claim Batch →
                        </button>
                      ) : (
                        <div className="popup-unverified-tag">
                          ⚠️ Verification Required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
