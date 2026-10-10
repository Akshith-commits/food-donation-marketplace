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
    <div
      className={`brand-logo-root ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "lg" ? "0.75rem" : size === "sm" ? "0.45rem" : "0.6rem",
        textDecoration: "none",
      }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bridgePlateGrad" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="mealCenterGrad" x1="18" y1="18" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* 1. Bridge Arch: Spanning connection linking surplus with need */}
        <path
          d="M 7 21 C 13 8, 35 8, 41 21"
          stroke="url(#bridgePlateGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* 2. Shared Plate / Bowl Curve underneath */}
        <path
          d="M 10 24 C 12 36, 36 36, 38 24"
          stroke="url(#bridgePlateGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />

        {/* 3. Hospitality Plate Rim Horizon */}
        <path
          d="M 14 23 C 18 25.5, 30 25.5, 34 23"
          stroke="url(#bridgePlateGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* 4. Shared Meal Kernel / Nourishing Center */}
        <circle
          cx="24"
          cy="19"
          r="3.5"
          fill="url(#mealCenterGrad)"
        />
      </svg>

      {showWordmark && (
        <span
          className="brand-wordmark"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.035em",
            fontSize: size === "lg" ? "1.65rem" : size === "sm" ? "1.05rem" : "1.3rem",
            color: "#fcfbf9",
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
