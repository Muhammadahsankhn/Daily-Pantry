import React from "react";
import "../../App.css";
import DiscountImage1 from '../../assets/Products-discount-Image2.png'
import DiscountImage2 from '../../assets/Products-discount-Image1.png'
import { Link } from "react-router-dom";

const DiscountSection = () => {
  return (
    <section className="discount-premium-promo">
      <div className="discount-promo-container">
        <div className="discount-promo-content reveal">
          <div className="discount-promo-badge">
            <span className="discount-dot"></span> Limited Season Offer
          </div>
          <h2 className="discount-promo-title">
            Harvest <span>Deals</span> That Matter.
          </h2>
          <p className="discount-promo-lead">
            Premium organic produce shouldn't be a luxury. Access our exclusive seasonal price-cuts and experience farm-to-door quality without the premium price tag.
          </p>

          <div className="discount-benefit-grid">
            <div className="discount-benefit-item">
              <div className="discount-icon-circle"><i className="fa-solid fa-percent"></i></div>
              <div>
                <h4>Up to 40% Off</h4>
                <p>Selected organic greens</p>
              </div>
            </div>
            <div className="discount-benefit-item">
              <div className="discount-icon-circle"><i className="fa-solid fa-truck-ramp-box"></i></div>
              <div>
                <h4>Smart Shipping</h4>
                <p>Free on orders over $50</p>
              </div>
            </div>
          </div>

          <div className="discount-action-row">
            <Link to="/Deal" className="discount-promo-cta">Claim Discount <i className="fa-solid fa-arrow-right"></i></Link>
            <div className="discount-expiry-text">Offer ends in: <strong>03 Days</strong></div>
          </div>
        </div>

        <div className="discount-promo-visual-mosaic reveal">
          <div className="discount-mosaic-main">
            <img src={DiscountImage1} alt="Fresh Veggies" />
            <div className="discount-mosaic-overlay-card">
              <span className="discount-save-label">SAVE</span>
              <span className="discount-save-amount">40%</span>
            </div>
          </div>
          <div className="discount-mosaic-sub">
            <img src={DiscountImage2} alt="Dairy" />
          </div>
          <div className="discount-floating-glass-badge">
            <i className="fa-solid fa-leaf"></i>
            <span>100% Bio</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
