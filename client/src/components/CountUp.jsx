import React, { useEffect, useState } from "react";

export default function CountUp({ end, duration = 1200, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startVal = 0;
    const endVal = Number(end) || 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(startVal + (endVal - startVal) * eased));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endVal);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}
