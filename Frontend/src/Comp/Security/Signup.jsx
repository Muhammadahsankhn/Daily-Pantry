import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Api.js";
import Popup from "./PopUp.jsx";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [forceUpdate, setForceUpdate] = useState(false); // triggers re-render

  // Re-check login status whenever forceUpdate changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [forceUpdate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { username, email, password });
      setPopupMessage("Account created successfully!");
      setShowPopup(true);
    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Signup failed");
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/Login");
  };

  // Logout handler for already logged-in users
  const handleLogout = () => {
    localStorage.removeItem("token");
    setForceUpdate(!forceUpdate); // re-render to show form
  };

  if (isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-card">
            <h2>You are already logged in</h2>
            <p>Please logout to create a new account.</p>
            <button className="primary-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-container">

          {/* LEFT SIDE — SAME AS LOGIN */}
          <div className="auth-info">
            <span className="premium-tag" style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "2px" }}>
              JOIN THE CLUB
            </span>
            <h1 style={{ marginTop: "15px" }}>
              Start Your <span>Healthy</span> Journey
            </h1>
            <p className="auth-tagline">
              Create an account today and get <strong>Free Delivery</strong> on your first three orders.
            </p>
            <ul className="auth-points">
              <li><i className="fa-solid fa-tags"></i> Exclusive Member-Only Deals</li>
              <li><i className="fa-solid fa-clock-rotate-left"></i> One-Tap Reorder History</li>
              <li><i className="fa-solid fa-wallet"></i> Digital Wallet & Quick Pay</li>
            </ul>
          </div>

          {/* RIGHT CARD */}
          <div className="auth-card">
            <h2>Create Account</h2>
            <p className="auth-subtext">Join thousands of happy customers</p>

            <form className="auth-form" onSubmit={handleSignup}>
              <div className="input-group">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Full Name" required onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Email Address" required onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                <input type="password" placeholder="Create Password" required onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button type="submit" className="primary-btn">
                Create My Account <i className="fa-solid fa-circle-check"></i>
              </button>
            </form>

            <p className="auth-footer">
              Already have an account? <Link className="auth-footer-Pb" to="/Login">Sign In instead</Link>
            </p>
          </div>

        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
    </>
  );
}
