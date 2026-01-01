import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="fo-premium-footer">
      {/* ===================== FOOTER UPPER AREA ===================== */}
      <div className="fo-footer-upper">
        <div className="fo-footer-main-grid">

          {/* Brand Information */}
          <div className="fo-footer-column fo-brand-info">
            <div className="fo-footer-logo">
              Daily<span>Pantry</span>
            </div>

            <p className="fo-brand-desc">
              Redefining grocery shopping with farm-to-door freshness. We prioritize organic quality and sustainable sourcing for your family.
            </p>

            <div className="fo-contact-strip">
              <div className="fo-contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <span>Phase 6, DHA, Karachi, Pakistan</span>
              </div>
              <div className="fo-contact-item">
                <i className="fa-solid fa-phone-volume"></i>
                <span>+92 300 1234567</span>
              </div>
            </div>
          </div>

          {/* Marketplace */}
          <div className="fo-footer-column">
            <h4>Marketplace</h4>
            <ul className="fo-footer-links">
              <li><Link to="/Fruits-Page">Fresh Fruits</Link></li>
              <li><Link to="/Vegetables-Page">Organic Vegetables</Link></li>
              <li><Link to="/Dairy-Page">Dairy & Eggs</Link></li>
              <li><Link to="/Bakery-Page">Bakery Items</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="fo-footer-column">
            <h4>Company</h4>
            <ul className="fo-footer-links">
              <li><Link to="/About-Us">About Us</Link></li>
              <li><Link to="/Our-Farmers">Our Farmers</Link></li>
              <li><Link to="/Contact-Us">Contact Us</Link></li>
              <li><Link to="/Track-Order">Track Order</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="fo-footer-column">
            <h4>Support</h4>
            <ul className="fo-footer-links">
              <li><Link to="/Terms&Condition">Terms And Conditions</Link></li>
              <li><Link to="/Privacy-Policy">Privacy Policy</Link></li>
              <li><Link to="/Refund-Policy">Refund Policy</Link></li>
              <li><Link to="/FAQs">FAQs</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* ===================== FOOTER LOWER AREA ===================== */}
      <div className="fo-footer-lower">
        <div className="fo-footer-bottom-container">

          <p className="fo-copyright">
            © 2025 <span>DailyPantry</span>. Built for a healthier lifestyle.
          </p>

          <div className="fo-social-links">
            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-twitter"></i></Link>
            <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
          </div>

          <div className="fo-payment-methods">
            <i className="fa-brands fa-cc-visa"></i>
            <i className="fa-brands fa-cc-mastercard"></i>
            <i className="fa-brands fa-apple-pay"></i>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
