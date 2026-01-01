import React from "react";
import '../../App.css'
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="policy-privacy-body">

      <section className="policy-hero">
        <h1>Privacy Suite</h1>
        <nav className="policy-breadcrumb-links">
          <Link to="/">Home</Link> <span style={{ opacity: 0.5 }}>/</span>
          <Link to="/Privacy-Policy" style={{ color: "white", fontWeight: 400 }}>
            Privacy Policy
          </Link>
        </nav>
      </section>

      <main className="policy-wrapper">
        <aside className="policy-nav">
          <div className="policy-nav-inner">
            <h4>Quick Jump</h4>
            <Link to="#collection" className="policy-nav-item">
              Data Collection
            </Link>
            <Link to="#usage" className="policy-nav-item">
              Information Usage
            </Link>
            <Link to="#security" className="policy-nav-item">
              Security Protocols
            </Link>
            <Link to="#logistics" className="policy-nav-item">
              Delivery Data
            </Link>
            <Link to="#thirdparty" className="policy-nav-item">
              Third Parties
            </Link>
          </div>
        </aside>

        <article className="policy-content">
          <span className="policy-last-updated">UPDATED: DECEMBER 2025</span>

          <section id="collection" className="policy-block">
            <h2>
              <i className="fas fa-fingerprint"></i> Information Collection
            </h2>
            <p>
              At DailyPantry, we prioritize your data sovereignty. We collect
              personal identifiers including your name, encrypted contact
              details, and artisanal shopping preferences. This data allows us
              to tailor your harvest selections and improve our predictive
              inventory models.
            </p>
          </section>

          <section id="usage" className="policy-block">
            <h2>
              <i className="fas fa-microchip"></i> Use of Information
            </h2>
            <p>
              Your information is the engine of our service. We utilize this
              data to synchronize harvest cycles with your delivery schedule,
              manage elite membership tiers, and provide real-time updates on
              seasonal produce arrivals.
            </p>
          </section>

          <section id="security" className="policy-block">
            <h2>
              <i className="fas fa-user-shield"></i> Security Protocols
            </h2>
            <p>
              We employ military-grade AES-256 encryption for all data at rest.
              Our payment gateways are PCI-DSS Level 1 certified, ensuring your
              financial footprint remains invisible to unauthorized entities. We
              conduct bi-annual security audits to maintain this standard.
            </p>
          </section>

          <section id="logistics" className="policy-block">
            <h2>
              <i className="fas fa-route"></i> Logistics Efficiency
            </h2>
            <p>
              To ensure our "Farm-to-Door" promise, we share essential
              delivery data with our logistics partners. This includes
              geolocation for route optimization, reducing carbon emissions
              while ensuring your produce arrives at peak freshness.
            </p>
          </section>

          <section id="thirdparty" className="policy-block">
            <h2>
              <i className="fas fa-handshake"></i> Third-Party Policy
            </h2>
            <p>
              DailyPantry operates on a strict "No-Sale" data policy. We do not
              monetize your personal information. Data sharing is limited
              exclusively to trusted infrastructure partners who facilitate
              your shopping experience, such as cloud hosting and delivery
              fulfillment.
            </p>
          </section>
        </article>
      </main>

    </div>
  );
}

export default PrivacyPolicy;
