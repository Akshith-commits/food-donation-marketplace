import React, { useState, useEffect } from "react";

export default function CountdownBadge({ targetTimestamp, fallbackText }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!targetTimestamp) return null;
    return targetTimestamp - Date.now();
  });

  useEffect(() => {
    if (!targetTimestamp) return;
    const interval = setInterval(() => {
      setTimeLeft(targetTimestamp - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTimestamp]);

  if (!targetTimestamp || timeLeft === null) {
    return (
      <span className="expiry-pill normal">
        <span className="pill-dot" />
        <span>{fallbackText || "Today"}</span>
      </span>
    );
  }

  if (timeLeft <= 0) {
    return (
      <span className="expiry-pill expired">
        <span className="pill-dot" />
        <span>Expired</span>
      </span>
    );
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const isCritical = timeLeft < 60 * 60 * 1000; // under 1 hour -> red
  const isApproaching = timeLeft < 3 * 60 * 60 * 1000; // under 3 hours -> amber

  const stateClass = isCritical ? "critical" : isApproaching ? "amber" : "normal";

  return (
    <span className={`expiry-pill ${stateClass}`}>
      <span className="pill-dot" />
      {isCritical ? (
        <span>Expiring in {minutes}m {seconds}s</span>
      ) : isApproaching ? (
        <span>Expiring in {hours}h {minutes}m</span>
      ) : (
        <span>Available for {hours}h</span>
      )}
    </span>
  );
}
