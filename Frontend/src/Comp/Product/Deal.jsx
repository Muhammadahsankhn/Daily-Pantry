import React from "react";
import '../../App.css'


import Image1 from '../../assets/Products-Dairy-Image5.png'
import Image2 from '../../assets/Products-Fruits-Image3.png'
import Image3 from '../../assets/Products-Vegetable-Image7.png'
import { Link } from "react-router-dom";

export default function Deal() {
  return (
    <div className="deal-body">


      <header className="deal-hero-wrap">
        <div className="deal-hero-bg-overlay"></div>

        <div className="deal-hero-frame">
          <div className="deal-hero-brand-line">DAILY PANTRY </div>

          <span className="deal-hero-eyebrow">Autumn / Winter Edition</span>

          <h1 className="deal-hero-heading">
            THE <br />
            <span className="deal-outline">VAULT</span>
          </h1>

          <p className="deal-hero-desc">
            A sanctuary for rare harvests. Access our private inventory of artisanal batches, hand-selected for the world's most discerning palates.
          </p>

          <div
            className="deal-hero-scroll"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          >
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </header>

      <main className="deal-strip-container">
        <Link to="/Dairy-Page" className="deal-strip-row">
          <div className="deal-strip-visual">
            <img src={Image1} alt="Pasture Raised Eggs" />
          </div>
          <div className="deal-strip-content">
            <div className="deal-strip-number">01</div>
            <span className="deal-strip-tag">Heritage Avian</span>
            <h2 className="deal-strip-title">Golden Shell <br />Pasture Eggs</h2>
            <p className="deal-strip-desc">
              Sourced from free-roaming heritage breeds. These deep-amber yolks offer a rich, creamy density and protein profile that mass-market alternatives cannot replicate.
            </p>
            <div className="deal-strip-btn">
              <span></span> Explore the Harvest
            </div>
          </div>
        </Link>

        <Link to="/Fruits-Page" className="deal-strip-row deal-is-reversed">
          <div className="deal-strip-visual">
            <img src={Image2} alt="Midnight Grapes" />
          </div>
          <div className="deal-strip-content">
            <div className="deal-strip-number">02</div>
            <span className="deal-strip-tag">Limited Flora</span>
            <h2 className="deal-strip-title">Obsidian <br />Midnight Grapes</h2>
            <p className="deal-strip-desc">
              A rare, moon-harvested variety known for its near-black skin and explosive honey-floral nectar. Available only for a 3-week window annually.
            </p>
            <div className="deal-strip-btn">
              <span></span> View Selection
            </div>
          </div>
        </Link>

        <Link to="/Vegetables-Page" className="deal-strip-row">
          <div className="deal-strip-visual">
            <img src={Image3} alt="Red Chillis" />
          </div>
          <div className="deal-strip-content">
            <div className="deal-strip-number">03</div>
            <span className="deal-strip-tag">Spice Reserve</span>
            <h2 className="deal-strip-title">Crimson <br />Fire Chillis</h2>
            <p className="deal-strip-desc">
              Hand-sorted for peak capsaicin intensity and sun-dried on cedar wood. These peppers provide a sophisticated heat with complex smoky undertones.
            </p>
            <div className="deal-strip-btn">
              <span></span> Claim Access
            </div>
          </div>
        </Link>
      </main>

    </div>
  );
}
