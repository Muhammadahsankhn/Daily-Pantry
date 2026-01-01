import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/Api.js";
import Popup from "./PopUp.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [forceUpdate, setForceUpdate] = useState(false); 

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [forceUpdate]);
 // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", { email, password });

      const { user, token } = res.data.data;

      // ✅ STORE REAL AUTH DATA
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      setPopupMessage("Login successful!");
      setShowPopup(true);

    
    if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/My-Account", { replace: true });
      }


    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Login failed");
      setShowPopup(true);
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/My-Account");
  };


  if (isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="auth-container">
          <div className="auth-card">
            <h2>You are already logged in</h2>
            <p>Please logout to login with a different account.</p>
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
          
          <div className="auth-info">
            <span className="premium-tag" style={{ color: "var(--accent)", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "2px" }}>
              WELCOME BACK
            </span>
            <h1 style={{ marginTop: "15px" }}>
              Continue Your <span>Healthy</span> Journey
            </h1>
            <p className="auth-tagline">
              Login to access your <strong>exclusive deals</strong>, order history, and wallet.
            </p>
            <ul className="auth-points">
              <li><i className="fa-solid fa-tags"></i> Member-Only Discounts</li>
              <li><i className="fa-solid fa-clock-rotate-left"></i> Order History</li>
              <li><i className="fa-solid fa-wallet"></i> Fast Checkout</li>
            </ul>
          </div>

         
          <div className="auth-card">
            <h2>Sign In</h2>
            <p className="auth-subtext">Welcome back! Please login</p>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="input-group">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="primary-btn">
                Login to My Account <i className="fa-solid fa-circle-check"></i>
              </button>
            </form>

            <p className="auth-footer">
              Don’t have an account? <Link className="auth-footer-P" to="/Signup">Create one</Link>
            </p>
          </div>
        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
    </>
  );
}
