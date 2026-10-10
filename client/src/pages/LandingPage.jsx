import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ScrollHero from "../components/ScrollHero";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  const handleEnter = () => {
    if (isFading) return;
    setIsFading(true);
  };

  return (
    <div className="landing-page-root" style={{ background: "#000", minHeight: "100vh", position: "relative" }}>
      {/* ScrollHero component keeping the exact scroll experience */}
      <ScrollHero onEnter={handleEnter} />

      {/* Fade to black overlay on exit to /app */}
      <AnimatePresence>
        {isFading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            onAnimationComplete={() => {
              navigate("/app");
            }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#000",
              zIndex: 9999,
              pointerEvents: "all",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
