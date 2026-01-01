import React from "react";
import "../../App.css";

const Popup = ({ message, iconClass, onClose, backHome }) => {
  // Determine if this is an error/failure or a success based on message or icon
  const isError = 
    message?.toLowerCase().includes("not found") || 
    message?.toLowerCase().includes("fail") || 
    message?.toLowerCase().includes("error") ||
    iconClass?.includes("exclamation") ||
    iconClass?.includes("xmark");

  return (
    <div className="deal-popup-overlay">
      <div className={`deal-popup-card ${isError ? "theme-error" : "theme-success"}`}>
        {/* Luxury Background Effects */}
        <div className="deal-popup-shimmer"></div>
        <div className="deal-popup-pattern"></div>
        
        <div className="deal-popup-content">
          {iconClass && (
            <div className="deal-popup-icon-wrapper">
              <i className={`${iconClass} deal-popup-main-icon`}></i>
              <div className="deal-popup-ring"></div>
              <div className="deal-popup-ring-outer"></div>
            </div>
          )}
          
          <div className="deal-text-container">
            <span className="deal-popup-badge">
                {isError ? "System Alert" : "Security Verified"}
            </span>
            <h3 className="deal-popup-title">{message}</h3>
            <p className="deal-popup-subtitle">
                The secure pantry vault has processed your request.
            </p>
          </div>
          
          <div className="deal-popup-actions">
            {backHome && (
              <button className="deal-popup-btn-primary" onClick={backHome}>
                Back to Pantry <i className="fas fa-arrow-right"></i>
              </button>
            )}
            <button className="deal-popup-btn-secondary" onClick={onClose}>
              Dismiss Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;