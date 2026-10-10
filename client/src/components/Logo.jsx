import React from "react";

export default function Logo({ size = "md", showWordmark = true, className = "" }) {
  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 56,
  };

  const px = iconSizes[size] || 32;

  return (
    <div className={`brand-logo-root ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logoArchGrad" x1="6" y1="12" x2="42" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f97316" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer glowing bridge arch that meets into a bowl */}
        <path
          d="M8 22 C 14 10, 34 10, 40 22"
          stroke="url(#logoArchGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
          filter="url(#glowFilter)"
        />

        {/* Lower curve of the bowl/plate */}
        <path
          d="M10 23 C 12 34, 36 34, 38 23"
          stroke="url(#logoArchGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* Food nourishment dot in center */}
        <circle cx="24" cy="19" r="3.2" fill="#f97316" />
      </svg>

      {showWordmark && (
        <span
          className="brand-wordmark"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            fontSize: size === "lg" ? "1.65rem" : size === "sm" ? "1.05rem" : "1.3rem",
            color: "#ffffff",
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          Food<span style={{ color: "#f97316" }}>Bridge</span>
        </span>
      )}
    </div>
  );
}
