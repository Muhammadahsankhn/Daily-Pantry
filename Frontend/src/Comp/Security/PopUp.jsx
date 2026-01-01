import React from "react";

export default function Popup({ message, onClose }) {
  return (
    <div className="security-popup-overlay">
      <div className="security-popup-card">
        <div className="security-popup-header">
          <i className="fa-solid fa-check"></i>
          <h3>Success</h3>
        </div>
        <p>{message}</p>
        <button className="security-primary-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}