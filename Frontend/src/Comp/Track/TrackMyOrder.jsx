import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
const TrackOrder = () => {
  return (
    <div className="track-outer-wrap">
      
      <nav className="track-nav-bar">
        <Link to="/" className="track-goback-btn">
          <i className="fas fa-chevron-left"></i> Return to Pantry
        </Link>

        <div className="track-live-pulse">
          <div className="track-pulse-dot"></div>
          System Status: Nominal
        </div>
      </nav>

      <div className="track-glass-card">

        <header className="track-top-banner">
          <div className="track-id-group">
            <span>Shipment Reference</span>
            <h1>DP-BK-2025-092</h1>
          </div>

          <div
            className="track-arrival-group"
            style={{ textAlign: "right" }}
          >
            <span
              style={{
                opacity: 0.6,
                display: "block",
                marginBottom: "5px",
              }}
            >
              ETA Window
            </span>

            <h2
              style={{
                fontFamily: "Syne",
                color: "var(--track-lime)",
              }}
            >
              14:30 — 15:45
            </h2>
          </div>
        </header>

        <section className="track-stepper-inner">
          <div className="track-node finished">
            <div className="track-node-circle">
              <i className="fas fa-check"></i>
            </div>
            <div className="track-node-label">Provisioned</div>
            <div className="track-node-status">08:22 AM</div>
          </div>

          <div className="track-node finished">
            <div className="track-node-circle">
              <i className="fas fa-check"></i>
            </div>
            <div className="track-node-label">Quality Inspection</div>
            <div className="track-node-status">09:45 AM</div>
          </div>

          <div className="track-node active">
            <div className="track-node-circle">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <div className="track-node-label">En Route</div>
            <div className="track-node-status">Live Tracking</div>
          </div>

          <div className="track-node">
            <div className="track-node-circle">
              <i className="fas fa-box-check"></i>
            </div>
            <div className="track-node-label">Final Delivery</div>
            <div className="track-node-status">Pending</div>
          </div>
        </section>

        <footer className="track-info-grid">
          <div className="track-info-box">
            <h4>Destination Address</h4>
            <div className="track-address-text">
              <strong>Daily Pantry</strong>
              <br />
              Phase 6, DHA, Karachi, Pakistan
            </div>
          </div>

          <div
            className="track-info-box"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4>Courier Identity</h4>
              <p className="track-address-text">
                <strong>Marcus Sterling</strong>
                <br />
                Premium Dispatch Team
              </p>
            </div>

            <Link
              to="/Contact-Us"
              style={{
                background: "var(--track-deep)",
                color: "white",
                padding: "15px 30px",
                borderRadius: "15px",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: "0.8rem",
              }}
            >
              MESSAGE COURIER
            </Link>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default TrackOrder;
