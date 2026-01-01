import React from "react";
import '../../App.css'
import { Link } from "react-router-dom";

function Support() {
  return (
    <div className="faq-body">


      <section className="faq-hero">
        <div className="faq-hero-content">
          <h1>
            Concierge <span>Support</span>
          </h1>
          <p>
            Expertly curated answers for our premium DailyPantry community. How
            can we assist your lifestyle today?
          </p>
          <div className="faq-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/Contact-Us" style={{ color: "white", opacity: 0.6 }}>
              Help Center
            </Link>
          </div>
        </div>
      </section>

      <main className="faq-wrapper">
        <aside className="faq-nav">
          <div className="faq-nav-card">
            <h4>Categories</h4>
            <Link to="#orders" className="faq-nav-link active">
              <i className="fas fa-box"></i> Orders
            </Link>
            <Link to="#payment" className="faq-nav-link">
              <i className="fas fa-credit-card"></i> Payment
            </Link>
            <Link to="#delivery" className="faq-nav-link">
              <i className="fas fa-truck"></i> Logistics
            </Link>
            <Link to="#returns" className="faq-nav-link">
              <i className="fas fa-sync"></i> Returns
            </Link>
          </div>
        </aside>

        <div className="faq-container">
          <div className="faq-card" onClick={(e) => {
            const card = e.currentTarget;
            document.querySelectorAll(".faq-card").forEach(c => {
              if(c !== card) c.classList.remove("active");
            });
            card.classList.toggle("active");
          }}>
            <div className="faq-header">
              <span>
                <i className="fas fa-shopping-basket"></i> How do I curate my premium order?
              </span>
              <i className="fas fa-chevron-down chevron"></i>
            </div>
            <div className="faq-content">
              <p>
                Simply select your artisanal produce, add to your digital suite, and proceed to our encrypted checkout. You will receive an immediate harvest confirmation via email.
              </p>
            </div>
          </div>

          <div className="faq-card" onClick={(e) => {
            const card = e.currentTarget;
            document.querySelectorAll(".faq-card").forEach(c => {
              if(c !== card) c.classList.remove("active");
            });
            card.classList.toggle("active");
          }}>
            <div className="faq-header">
              <span>
                <i className="fas fa-wallet"></i> Which elite payment tiers do you support?
              </span>
              <i className="fas fa-chevron-down chevron"></i>
            </div>
            <div className="faq-content">
              <p>
                We facilitate seamless transactions via all major Credit/Debit cards, Apple Pay, Google Pay, and high-security UPI gateways for your convenience.
              </p>
            </div>
          </div>

          <div className="faq-card" onClick={(e) => {
            const card = e.currentTarget;
            document.querySelectorAll(".faq-card").forEach(c => {
              if(c !== card) c.classList.remove("active");
            });
            card.classList.toggle("active");
          }}>
            <div className="faq-header">
              <span>
                <i className="fas fa-bolt"></i> What is the 'Freshness Window' for delivery?
              </span>
              <i className="fas fa-chevron-down chevron"></i>
            </div>
            <div className="faq-content">
              <p>
                Our logistics network is optimized for speed. Metropolitan residents typically enjoy delivery within a 2-4 hour window from the moment of harvest dispatch.
              </p>
            </div>
          </div>

          <div className="faq-card" onClick={(e) => {
            const card = e.currentTarget;
            document.querySelectorAll(".faq-card").forEach(c => {
              if(c !== card) c.classList.remove("active");
            });
            card.classList.toggle("active");
          }}>
            <div className="faq-header">
              <span>
                <i className="fas fa-leaf"></i> Are your products ethically sourced?
              </span>
              <i className="fas fa-chevron-down chevron"></i>
            </div>
            <div className="faq-content">
              <p>
                Sustainability is our architecture. Every item is trace-to-source certified, supporting local farmers who utilize regenerative agricultural practices.
              </p>
            </div>
          </div>

          <div className="faq-support-cta">
            <h3>Still have questions?</h3>
            <p>Our lifestyle managers are available 24/7 to assist you.</p>
            <Link to="/Contact-Us" className="faq-btn-contact">Speak with an Expert</Link>
          </div>
        </div>
      </main>

      <div id="footer"></div>
    </div>
  );
}

export default Support;
