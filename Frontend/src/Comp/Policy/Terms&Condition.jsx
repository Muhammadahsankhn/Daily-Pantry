import React from "react";
import '../../App.css'
import { Link } from "react-router-dom";

function TermsOfService() {
  return (
    <div className="terms-body">
      <section className="terms-hero">
        <nav className="terms-breadcrumb-links">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="#" style={{ color: "white", opacity: 0.6 }}>
            Legal
          </Link>
        </nav>
        <h1>
          Terms of <span>Service</span>
        </h1>
      </section>

      <section className="terms-section">
        <div className="terms-grid">
          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-id-card"></i>
            </div>
            <h2>Member Registration</h2>
            <p>
              Access to the DailyPantry digital ecosystem requires a verified
              account. Users must provide authentic credentials. Sharing
              account access with unauthorized third parties is strictly
              prohibited to maintain community security.
            </p>
          </div>

          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <h2>Fiscal Protocols</h2>
            <p>
              Transactions are executed via encrypted gateways. Orders are
              considered binding once the 'Harvest Confirmation' is issued. We
              support elite payment tiers including digital wallets and
              international credit systems.
            </p>
          </div>

          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h2>Product Integrity</h2>
            <p>
              As we deal with artisanal and seasonal harvests, availability is
              subject to nature. DailyPantry reserves the right to offer
              premium substitutions or immediate credits if a specific harvest
              falls below our quality threshold.
            </p>
          </div>

          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-shipping-fast"></i>
            </div>
            <h2>Logistics & Dispatch</h2>
            <p>
              Dispatch timelines are estimates based on real-time traffic and
              harvest schedules. While we strive for the 'Freshness Window'
              (2-4 hours), external environmental factors may occasionally
              shift delivery windows.
            </p>
          </div>

          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h2>Refund Architecture</h2>
            <p>
              Due to the perishable nature of our goods, return requests must
              be initiated within 2 hours of delivery receipt. Verified
              discrepancies in quality will be resolved via account credits or
              original payment reversals.
            </p>
          </div>

          <div className="terms-block">
            <div className="terms-icon">
              <i className="fas fa-gavel"></i>
            </div>
            <h2>Legal Framework</h2>
            <p>
              DailyPantry reserves the right to modify these service terms to
              reflect evolving agricultural laws or logistical improvements.
              Continued use of our platform constitutes agreement to the most
              recent framework.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService;
