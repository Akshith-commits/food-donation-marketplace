import React, { useState } from "react";
import { resetDemoData } from "../lib/store";

export default function Banner({ onReset }) {
  const [resetting, setResetting] = useState(false);

  const handleReset = () => {
    if (window.confirm("Reset all donations and NGOs back to default demo state?")) {
      setResetting(true);
      resetDemoData();
      if (onReset) onReset();
      setTimeout(() => {
        setResetting(false);
        window.location.reload();
      }, 300);
    }
  };

  return (
    <div className="prototype-banner">
      <div className="banner-content">
        <span className="banner-badge">Demo Mode</span>
        <span className="banner-text">
          Prototype: data is stored in your browser
        </span>
      </div>
      <button 
        type="button" 
        onClick={handleReset} 
        className="banner-reset-btn"
        title="Reset mock donations and NGOs back to initial 10 items"
      >
        {resetting ? "Resetting..." : "Reset Demo Data"}
      </button>
    </div>
  );
}
