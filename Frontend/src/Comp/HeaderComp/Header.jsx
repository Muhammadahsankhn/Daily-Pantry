import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import api from "../api/Api.js"; 
import Popup from "../HeaderComp/Popup.jsx"; 

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // const role = localStorage.getItem("role");

  
  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (!trimmedQuery) return;

    const staticPages = [
      { name: "Home", path: "/" },
      { name: "Login", path: "/Login" },
      { name: "Signup", path: "/Signup" },
      { name: "My Account", path: "/My-Account" },
      { name: "About Us", path: "/About-Us" },
      { name: "Our Farmers", path: "/Our-Farmers" },
      { name: "Contact Us", path: "/Contact-Us" },
      { name: "Track Order", path: "/Track-Order" },
      { name: "Terms & Conditions", path: "/Terms&Condition" },
      { name: "Privacy Policy", path: "/Privacy-Policy" },
      { name: "Refund Policy", path: "/Refund-Policy" },
      { name: "FAQs", path: "/FAQs" },
      { name: "Fresh Fruits", path: "/Fruits-Page" },
      { name: "Organic Vegetables", path: "/Vegetables-Page" },
      { name: "Dairy & Eggs", path: "/Dairy-Page" },
      { name: "Bakery Items", path: "/Bakery-Page" },
    ];

    
    const matchedPage = staticPages.find(
      (page) =>
        page.name.toLowerCase() === trimmedQuery ||
        page.name.toLowerCase().includes(trimmedQuery)
    );

    if (matchedPage) {
      navigate(matchedPage.path);
      setSearchQuery("");
      return;
    }

   
    try {
      const res = await api.get(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      if (res.data.success && res.data.data.length > 0) {
        navigate(`/search-results?q=${encodeURIComponent(trimmedQuery)}`);
      } else {
   
        setShowPopup(true);
      }
    } catch (err) {
      setShowPopup(true);
    }

    setSearchQuery("");
  };

  return (
    <>
      {/* ===================== TOP INFORMATION BAR ===================== */}
      <div className="gm-topbar">
        <div className="gm-topbar-left">
          <Link to="tel:+923001234567">
            <i className="fa-solid fa-phone"></i> +92 300 1234567
          </Link>
          <Link to="mailto:support@DailyPantry.com" className="hide-mobile">
            <i className="fa-solid fa-envelope"></i> support@DailyPantry.com
          </Link>
        </div>

        <div className="gm-topbar-center hide-tablet">
          Daily & Healthy Groceries Delivered Daily
        </div>

        <div className="gm-topbar-right">
          <span className="premium-tag">
            <i className="fa-solid fa-leaf"></i> Organic
          </span>
        </div>
      </div>
      {/* ===================== END TOP INFORMATION BAR ===================== */}

      {/* ===================== MAIN HEADER ===================== */}
      <header className="grocery-header">

        {/* Mobile Menu Toggle */}
        <input type="checkbox" id="menu-toggle" className="menu-checkbox" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Logo */}
        <div className="logo">
          DAILY<span>Pantry</span>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>

          <div className="shop-dropdown">
            <Link to="#" className="shop-trigger">
              Shop <i className="fa-solid fa-chevron-down"></i>
            </Link>
            <div className="shop-menu">
              <Link to="/Fruits-Page">
                <i className="fa-solid fa-apple-whole"></i> Fruits
              </Link>
              <Link to="/Dairy-Page">
                <i className="fa-solid fa-cow"></i> Dairy & Eggs
              </Link>
              <Link to="/Bakery-Page">
                <i className="fa-solid fa-bread-slice"></i> Bakery
              </Link>
              <Link to="/Vegetables-Page">
                <i className="fa-solid fa-seedling"></i> Vegetables
              </Link>
            </div>
          </div>

          
          <Link to="/Deal">Deals</Link>
          <Link to="/FAQs">FAQs</Link>
          
      
        </nav>

        {/* ===================== SEARCH BOX ===================== */}
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Header Actions */}
        <div className="header-actions">
          <Link to="/Cart" className="icon-btn cart-icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>

          <div className="user-menu">
            <div className="icon-btn">
              <i className="fa-solid fa-user-shield"></i>
            </div>

            <div className="user-dropdown">
              <Link to="/Login">
                <i className="fa-solid fa-right-to-bracket"></i> Login
              </Link>
              <Link to="/Signup">
                <i className="fa-solid fa-user-plus"></i> Signup
              </Link>
              <Link to="/My-Account">
                <i className="fa-solid fa-circle-user"></i> Account
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== POPUP FOR NO SEARCH RESULTS ===================== */}
      {showPopup && (
        <Popup
          message="Item not found!"
          iconClass="fa-solid fa-circle-exclamation"
          onClose={() => setShowPopup(false)}
          backHome={() => {
            setShowPopup(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export default Header;
