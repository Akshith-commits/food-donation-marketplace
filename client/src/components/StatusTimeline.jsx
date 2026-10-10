import React from "react";

const STEPS = [
  { key: "available", label: "Listed" },
  { key: "claimed", label: "Claimed" },
  { key: "picked_up", label: "Picked up" },
  { key: "delivered", label: "Delivered" },
];

export default function StatusTimeline({ status }) {
  const getStepIndex = (st) => {
    switch (st) {
      case "available":
        return 0;
      case "claimed":
        return 1;
      case "picked_up":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="status-timeline-wrap">
      {STEPS.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isCurrent = idx === currentIndex;

        return (
          <React.Fragment key={step.key}>
            <div className={`timeline-step-node ${isCurrent ? "current" : isCompleted ? "completed" : "pending"}`}>
              <div className="node-circle">
                {isCompleted ? "✓" : idx + 1}
              </div>
              <span className="node-label">{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`timeline-step-connector ${
                  idx < currentIndex ? "connector-filled" : "connector-empty"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
