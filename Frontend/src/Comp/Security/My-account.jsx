import React, { useState, useEffect } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import api from "../api/Api.js";
import Popup from "./PopUp.jsx";

export default function MyAccount() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Reactive check in case token changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/users/logout"); // optional if backend logout exists
      localStorage.removeItem("token"); // remove token on frontend
      setIsLoggedIn(false);
      setPopupMessage("Logged out successfully!");
      setShowPopup(true);
    } catch {
      setPopupMessage("Logout failed");
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/"); // redirect after logout
  };

  return (
    <>
      <div className="account-wrapper">
        <div className="account-card">
          {isLoggedIn ? (
            <>
              <span>Premium Member</span>
              <h2>
                <i className="fa-solid fa-circle-user"></i> My Profile
              </h2>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="fa-solid fa-power-off"></i> Secure Logout
              </button>
            </>
          ) : (
            <h2>You are not logged in.</h2>
          )}
        </div>
      </div>

      {showPopup && <Popup message={popupMessage} onClose={handlePopupClose} />}
    </>
  );
}
