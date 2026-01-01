import React, { useState, useEffect } from "react";
import "../../App.css";
import api from "../api/Api.js";
import Popup from "../Security/PopUp.jsx";

const Newsletter = ({ user }) => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user/email already subscribed on mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const emailToCheck = user?.email || email;
        if (!emailToCheck) return;

        // ADMIN: fetch all subscribers
        if (user?.role === "admin") {
          const token = localStorage.getItem("token"); // or from cookie
          const response = await api.get("/newsletter/getAllSubscribers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const subscribedEmails = response.data.data.map((sub) =>
            sub.email.toLowerCase()
          );

          if (subscribedEmails.includes(emailToCheck.toLowerCase())) {
            setAlreadySubscribed(true);
            if (user?.email) setEmail(user.email); // prefill
          }
        } else {
          // NORMAL USER: use public endpoint to check subscription
          const res = await api.post("/newsletter/checkSubscription", { email: emailToCheck });

          if (res.data.subscribed) {
            setAlreadySubscribed(true);
            if (user?.email) setEmail(user.email);
          }
        }
      } catch (err) {
        console.error("Error checking subscription:", err);
      }
    };

    checkSubscription();
  }, [user, email]);

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setPopupMessage("Please enter a valid email");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    try {
      await api.post("/newsletter/subscribeToNewsletter", { email });
      setPopupMessage("Subscribed successfully!");
      setShowPopup(true);
      setAlreadySubscribed(true); // Hide form
    } catch (err) {
      const message = err.response?.data?.message || "Subscription failed";
      if (message === "Already subscribed") {
        setAlreadySubscribed(true);
        setPopupMessage("You have already subscribed with this email!");
      } else {
        setPopupMessage(message);
      }
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="Newfinal-impact-section">
      <div className="Newimpact-bg-text">DailyPantry SUSTAINABILITY</div>

      <div className="Newimpact-container">
        <div className="Newreveal-content">
          <span className="Newbadge">Join the Movement</span>
          <h2 className="Newimpact-title">
            Ready to taste the <span>Difference?</span>
          </h2>
          <p className="Newimpact-subtitle">
            We are currently accepting new members for our seasonal harvest cycle.
            Secure your spot in the farm-to-table revolution.
          </p>
        </div>

        {!alreadySubscribed ? (
          <div className="Newinvite-card">
            <div className="Newcard-glass">
              <div className="Newglass-content">
                <h3>The Exclusive Box</h3>
                <ul>
                  <li><i className="fas fa-check-circle"></i> Priority access to rare harvests</li>
                  <li><i className="fas fa-check-circle"></i> Weekly farm-gate prices</li>
                  <li><i className="fas fa-check-circle"></i> Zero plastic guarantee</li>
                </ul>

                <div className="Newemail-sub">
                  <input
                    type="email"
                    aria-label="Email for newsletter subscription"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="Newbtn-invite"
                    type="button"
                    onClick={handleSubscribe}
                    disabled={loading}
                    aria-label="Subscribe to newsletter"
                  >
                    {loading ? "Submitting..." : "Get Invited"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="Newinvite-card">
            <div className="Newcard-glass" style={{ textAlign: "center", padding: "40px" }}>
              <h3>You have already subscribed!</h3>
              <p>Please use a different email to subscribe again.</p>
            </div>
          </div>
        )}
      </div>

      <div className="Newpremium-line"></div>

      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </section>
  );
};

export default Newsletter;
