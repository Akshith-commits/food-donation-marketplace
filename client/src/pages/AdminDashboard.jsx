import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  getStats,
  getNgos,
  verifyNgo,
} from "../lib/store";
import CountUp from "../components/CountUp";
import { useToast } from "../components/useToast";

// Weekly rescue data for simple CSS/SVG animated bar chart
const WEEKLY_DATA = [
  { day: "Mon", meals: 145 },
  { day: "Tue", meals: 190 },
  { day: "Wed", meals: 165 },
  { day: "Thu", meals: 220 },
  { day: "Fri", meals: 285 },
  { day: "Sat", meals: 340 },
  { day: "Sun", meals: 250 },
];

const HYDERABAD_LIVE_POOL = [
  "Charminar Community Kitchen claimed 40 plates of chicken dum biryani from Charminar Biryani House",
  "Annapurna Seva Trust picked up 60 meals of vegetable pulao from Jubilee Hills Banquet Hall",
  "Hyderabad Food Rescue Foundation distributed 30 kg of khubani ka meetha in Banjara Hills",
  "Nawab's Irani Cafe listed 75 packets of Osmania biscuits & Irani chai in Secunderabad",
  "Gachibowli Corporate Canteen dispatched 100 meal packs of dal tadka to migrant shelters",
  "Madhapur Tiffin Centre listed 90 plates of hot idli and sambar",
  "Charminar Community Kitchen marked 50 plates of biryani as delivered to Old City shelters",
  "Annapurna Seva Trust received 70 packets of chapati and paneer curry in Begumpet",
];

export default function AdminDashboard() {
  const { addToast } = useToast();
  const [stats, setStats] = useState(() => getStats());
  const [ngos, setNgos] = useState(() => getNgos());
  const [verifyingId, setVerifyingId] = useState(null);

  // Initial live activity list
  const [activities, setActivities] = useState(() => [
    {
      id: "act-init-1",
      title: "Charminar Community Kitchen claimed 40 plates of dum biryani from Charminar Biryani House",
      time: "Just now",
      status: "claimed",
    },
    {
      id: "act-init-2",
      title: "Annapurna Seva Trust picked up 60 meals of vegetable pulao from Jubilee Hills Banquet Hall",
      time: "2 mins ago",
      status: "picked_up",
    },
    {
      id: "act-init-3",
      title: "Hyderabad Food Rescue Foundation completed delivery of 95 meals in Hitech City",
      time: "5 mins ago",
      status: "delivered",
    },
    {
      id: "act-init-4",
      title: "Madhapur Tiffin Centre published 90 plates of fresh idli and sambar",
      time: "8 mins ago",
      status: "available",
    },
  ]);

  const loadData = () => {
    setStats(getStats());
    setNgos(getNgos());
  };

  const handleVerify = (ngoId, ngoName) => {
    setVerifyingId(ngoId);
    setTimeout(() => {
      verifyNgo(ngoId);
      loadData();
      setVerifyingId(null);
      addToast(`NGO "${ngoName}" has been successfully verified!`, "success");
    }, 400);
  };

  // Add realistic Hyderabad event every 8 seconds
  useEffect(() => {
    let poolIndex = 0;
    const interval = setInterval(() => {
      const nextTitle = HYDERABAD_LIVE_POOL[poolIndex % HYDERABAD_LIVE_POOL.length];
      poolIndex++;

      let actionStatus = "available";
      if (nextTitle.includes("claimed")) actionStatus = "claimed";
      if (nextTitle.includes("picked up")) actionStatus = "picked_up";
      if (nextTitle.includes("delivered") || nextTitle.includes("distributed")) actionStatus = "delivered";

      const newEvent = {
        id: `act-${Date.now()}`,
        title: nextTitle,
        time: "Just now",
        status: actionStatus,
      };

      setActivities((prev) => [newEvent, ...prev.slice(0, 10)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const maxWeeklyMeals = Math.max(...WEEKLY_DATA.map((d) => d.meals));

  return (
    <div className="portal-root">
      <Navbar />

      <main className="portal-content">
        <div className="portal-header">
          <div>
            <div className="portal-breadcrumb">Platform Control / Hyderabad Operations</div>
            <h1 className="portal-title">Platform Operations Center</h1>
            <p className="portal-subtitle">
              Oversee city-wide food rescue logistics, authenticate NGO partners, and monitor active distribution streams.
            </p>
          </div>
        </div>

        {/* 4 Animated Stat Cards with Count-Up */}
        <div className="stats-cards-grid">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="stat-card-top">
              <span className="stat-card-title">Total Donations</span>
              <span className="stat-icon-pill">📦</span>
            </div>
            <div className="stat-card-number">
              <CountUp end={stats.totalDonations} />
            </div>
            <div className="stat-card-footer">
              <span className="stat-highlight">100% active</span> across 6 Hyderabad zones
            </div>
          </motion.div>

          <motion.div
            className="stat-card stat-card-accent"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="stat-card-top">
              <span className="stat-card-title">Meals Saved</span>
              <span className="stat-icon-pill">🍲</span>
            </div>
            <div className="stat-card-number">
              <CountUp end={stats.mealsSaved} />
            </div>
            <div className="stat-card-footer">
              <span className="stat-highlight">≈ {Math.round(stats.mealsSaved * 0.42)} kg</span> food waste prevented
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="stat-card-top">
              <span className="stat-card-title">Delivered to Shelters</span>
              <span className="stat-icon-pill">✅</span>
            </div>
            <div className="stat-card-number">
              <CountUp end={stats.delivered} />
            </div>
            <div className="stat-card-footer">
              <span className="stat-highlight">{stats.pickedUpCount} batches</span> currently in transit
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="stat-card-top">
              <span className="stat-card-title">Active NGOs</span>
              <span className="stat-icon-pill">🤝</span>
            </div>
            <div className="stat-card-number">
              <CountUp end={stats.activeNgos} />
            </div>
            <div className="stat-card-footer">
              <span className="stat-highlight">{ngos.length - stats.activeNgos} pending</span> review
            </div>
          </motion.div>
        </div>

        {/* Weekly Chart Section */}
        <motion.div
          className="admin-chart-card mb-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <div className="card-section-header">
            <div>
              <h2>Meals Rescued This Week</h2>
              <p>Daily volume of meals saved from commercial kitchens across Hyderabad.</p>
            </div>
            <div className="chart-legend-badge">
              <span className="legend-dot" /> Verified Daily Dispatches
            </div>
          </div>

          <div className="custom-bar-chart">
            {WEEKLY_DATA.map((item, idx) => {
              const heightPercent = Math.round((item.meals / maxWeeklyMeals) * 100);
              const isPeak = item.meals === maxWeeklyMeals;

              return (
                <div key={item.day} className="chart-bar-col">
                  <div className="bar-track">
                    <motion.div
                      className={`bar-fill ${isPeak ? "bar-peak" : ""}`}
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.7, delay: 0.1 * idx, ease: "easeOut" }}
                    >
                      <span className="bar-tooltip">{item.meals}</span>
                    </motion.div>
                  </div>
                  <span className="bar-day-label">{item.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 2-Column: NGO Verification Table + Live Activity Feed */}
        <div className="admin-grid-layout">
          {/* NGO Verification Table Column */}
          <div className="admin-table-card">
            <div className="card-section-header">
              <div>
                <h2>NGO Partner Accreditation</h2>
                <p>Verify grassroots Hyderabad charities to authorize donation claims.</p>
              </div>
              <span className="counter-pill">{ngos.length} Registered</span>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Area</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ngos.map((ngo) => (
                    <tr key={ngo.id}>
                      <td>
                        <div className="ngo-table-cell">
                          <strong>{ngo.name}</strong>
                          <span className="ngo-meta-sub">{ngo.contact}</span>
                        </div>
                      </td>
                      <td>
                        <span className="city-tag">📍 {ngo.area || "Hyderabad"}</span>
                      </td>
                      <td>
                        {ngo.verified ? (
                          <span className="badge-status-delivered">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="badge-status-claimed">
                            ⚠️ Pending Review
                          </span>
                        )}
                      </td>
                      <td className="text-right">
                        {ngo.verified ? (
                          <span className="verified-check-label">
                            Authorized
                          </span>
                        ) : (
                          <motion.button
                            type="button"
                            onClick={() => handleVerify(ngo.id, ngo.name)}
                            className="btn-verify"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={verifyingId === ngo.id}
                          >
                            {verifyingId === ngo.id ? "Verifying..." : "Verify NGO"}
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Activity Feed Column (updated every 8s) */}
          <div className="admin-activity-card">
            <div className="card-section-header">
              <div>
                <h2>Live Activity Feed</h2>
                <p>Real-time Hyderabad network events (auto-refreshed).</p>
              </div>
              <span className="activity-live-indicator">
                <span className="pulse-dot" /> Live
              </span>
            </div>

            <div className="activity-timeline">
              <AnimatePresence>
                {activities.map((act) => (
                  <motion.div
                    key={act.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="timeline-item"
                  >
                    <div className={`timeline-dot dot-${act.status}`} />
                    <div className="timeline-body">
                      <p className="timeline-text">{act.title}</p>
                      <div className="timeline-meta">
                        <span className="timeline-time">{act.time}</span>
                        <span className={`status-pill status-${act.status}`}>
                          {act.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
