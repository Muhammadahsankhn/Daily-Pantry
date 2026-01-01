import React from "react";
import '../../App.css'
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="refund-body">
 

      <section className="refund-policy-hero">
        <h1>Refund Policy</h1>
        <p>
          Honest farming meets honest service. If your harvest isn't perfect,
          we'll make it right with zero friction.
        </p>
      </section>

      <div className="refund-policy-stats">
        <div className="refund-stat-card">
          <i className="fas fa-history"></i>
          <h4>7-Day Window</h4>
          <p>Generous time for return requests</p>
        </div>
        <div className="refund-stat-card">
          <i className="fas fa-shipping-fast"></i>
          <h4>24h Perishables</h4>
          <p>Rapid response for fresh items</p>
        </div>
        <div className="refund-stat-card">
          <i className="fas fa-check-circle"></i>
          <h4>Full Credit</h4>
          <p>100% refund on verified claims</p>
        </div>
      </div>

      <div className="refund-policy-layout">
        <aside className="refund-policy-nav-wrapper">
          <div className="refund-policy-nav-card">
            <h5>Navigation</h5>
            <ul>
              <li>
                <a href="#general">General Overview</a>
              </li>
              <li>
                <a href="#process">The Refund Steps</a>
              </li>
              <li>
                <a href="#security">Safe & Encrypted</a>
              </li>
              <li>
                <a href="#delivery">Logistics Issues</a>
              </li>
              <li>
                <a href="#notes">Provisions</a>
              </li>
            </ul>
          </div>
        </aside>

        <main className="refund-policy-content">
          <section className="refund-policy-block" id="general">
            <h2>
              <i className="fas fa-undo-alt"></i> General Overview
            </h2>
            <p>
              At <strong>DailyPantry</strong>, we stand by every leaf, grain, and
              drop we deliver. If your order arrives damaged, incorrect, or
              doesn't meet our freshness standards, you are eligible for a full
              refund or exchange.
            </p>
            <p>
              To ensure fairness, we ask that claims are submitted within{" "}
              <strong>7 days</strong> of the delivery date. For perishable goods
              (dairy, meat, greens), please notify us within 24 hours.
            </p>
          </section>

          <section className="refund-policy-block" id="process">
            <h2>
              <i className="fas fa-sync"></i> The Refund Steps
            </h2>
            <p>
              Initiating a refund is simple. Visit our{" "}
              <Link to="/Contact-Us">Digital Concierge</Link> and provide your
              order number. A photo of the item in question helps our quality
              control team prevent future issues.
            </p>
            <p>
              Approved refunds are processed instantly. Depending on your bank,
              the credit will appear in your account within{" "}
              <strong>5-7 business days</strong>.
            </p>
          </section>

          <section className="refund-policy-block" id="security">
            <h2>
              <i className="fas fa-user-shield"></i> Safe & Encrypted
            </h2>
            <p>
              We take your financial security seriously. All refund transactions
              are processed through <strong>PCI-DSS Level 1</strong> compliant
              gateways. Your raw payment data is never stored on our local
              servers.
            </p>
            <p>
              For more on how we protect your information, read our{" "}
              <Link to="/Privacy-Policy">Security Protocol</Link>.
            </p>
          </section>

          <section className="refund-policy-block" id="delivery">
            <h2>
              <i className="fas fa-map-marker-alt"></i> Logistics Issues
            </h2>
            <p>
              If a delivery is significantly delayed or an item is missing from
              your signature pantry bag, we offer an immediate choice between a{" "}
              <strong>full refund</strong> for the item or a priority redelivery
              at no cost.
            </p>
          </section>

          <section className="refund-policy-block" id="notes">
            <h2>
              <i className="fas fa-sticky-note"></i> Provisions
            </h2>
            <p>
              Please be advised that original shipping fees are generally
              non-refundable unless the error was made by DailyPantry. We reserve
              the right to review accounts that show an unusual frequency of
              refund requests.
            </p>
          </section>

          <div className="refund-support-cta">
            <h3>Human Support, 24/7</h3>
            <p>
              Our team is always ready to ensure your pantry stays full and your
              mind stays at ease.
            </p>
            <Link to="/Contact-Us" className="refund-btn-premium">
              Open Support Ticket
            </Link>
          </div>
        </main>
      </div>

  
    </div>
  );
};

export default RefundPolicy;
