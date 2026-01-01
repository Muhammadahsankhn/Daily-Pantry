import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import api from "../api/Api.js"; // Make sure api.js exports axios instance
import Popup from "../Security/PopUp.jsx";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact/sendMessage", {
        name,
        email,
        message: `${subject} - ${message}`,
      });
      setPopupMessage("Message sent successfully!");
      setShowPopup(true);

      // Clear form
      setName("");
      setEmail("");
      setSubject("General Inquiry");
      setMessage("");
    } catch (err) {
      setPopupMessage(err.response?.data?.message || "Failed to send message");
      setShowPopup(true);
    }
  };

  return (
    <>
      <section className="contactus-contact-hero">
        <h1>Get in Touch</h1>
        <nav className="contactus-breadcrumb-links">
          <Link to="/">Home</Link> / <span>Contact Us</span>
        </nav>
      </section>

      <main className="contactus-contact-wrapper">
        <div className="contactus-form-card">
          <h2>Send a Message</h2>
          <p>Our concierge team typically responds within 2 business hours.</p>

          <form onSubmit={handleSubmit}>
            <div className="contactus-input-group">
              <label>Full Name</label>
              <input
                type="text"
                className="contactus-form-control"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="contactus-input-group">
              <label>Email Address</label>
              <input
                type="email"
                className="contactus-form-control"
                placeholder="xyz@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="contactus-input-group">
              <label>Subject</label>
              <select
                className="contactus-form-control"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Bulk/Corporate Orders</option>
                <option>Feedback</option>
              </select>
            </div>

            <div className="contactus-input-group">
              <label>Message</label>
              <textarea
                className="contactus-form-control"
                rows="5"
                placeholder="How can we help you today?"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="contactus-btn-premium">
              Initiate Contact
            </button>
          </form>
        </div>

        <aside className="contactus-info-card">
          <div className="contactus-info-block">
            <h4>Corporate HQ</h4>
            <p>
              Phase 6, DHA, Karachi, Pakistan
              
            </p>
          </div>

          <div className="contactus-info-block">
            <h4>Support Hotline</h4>
            <p>
              <Link to="tel:+918009054294">+91 8009 054294</Link>
            </p>
            <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>
              Mon-Sun: 6am - 11pm
            </p>
          </div>

          <div className="contactus-info-block">
            <h4>Direct Email</h4>
            <p>
              <Link to="mailto:concierge@Dailymart.com">
                concierge@DailyPantry.com
              </Link>
            </p>
          </div>

          <div className="contactus-social-row">
            <Link to="#" className="contactus-social-circle">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#" className="contactus-social-circle">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" className="contactus-social-circle">
              <i className="fab fa-linkedin-in"></i>
            </Link>
            <Link to="#" className="contactus-social-circle">
              <i className="fab fa-x-twitter"></i>
            </Link>
          </div>
        </aside>
      </main>

      <section className="contactus-map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2157071441224!2d-73.985428!3d40.748441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a147!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1672912345678"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </section>

      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default ContactUs;
