import React from "react";
import "../../App.css";
import HeroImage from '../../assets/HeroPage-Image1.png'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="hero-hero-main">
      <div className="hero-blob-gradient"></div>

      <div className="hero-hero-wrapper">
        <div className="hero-hero-text-area">
          <div className="hero-status-pill hero-reveal">
            <span className="hero-pulse"></span> Now Delivering in 12 Minutes
          </div>

          <h1 className="hero-reveal">
            Nature’s <br />
            <span>Best,</span> Handpicked.
          </h1>

          <p className="hero-reveal">
            Experience the gold standard of organic groceries. We bridge the gap
            between artisanal farmers and your kitchen with zero-compromise
            quality.
          </p>

          <div className="hero-hero-actions hero-reveal">
           <button
  className="hero-btn-main"
  onClick={() => {
    const section = document.getElementById("Categories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  Start Shopping <i className="fa-solid fa-arrow-right"></i>
</button>

            <Link to={"/Deal"} href="/deal.html" className="hero-btn-ghost">
              View Flash Deals
            </Link>
          </div>
        </div>

        <div className="hero-hero-visual-area hero-reveal">
          <div className="hero-main-img-card">
            <img
              src={HeroImage}
              alt="Premium Groceries"
            />

            <div className="hero-floating-price-tag">
              <span className="hero-small">Organic</span>
              <span className="hero-price">99.99%</span>
            </div>
          </div>

          <div className="hero-accent-card">
            <i className="fa-solid fa-bolt"></i>
            <p>
              Express <br /> Delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
