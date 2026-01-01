import React from "react";
import PersonImage1 from '../../assets/Person-Image1.png'
import PersonImage2 from '../../assets/Person-Image2.png'
import PersonImage3 from '../../assets/Person-Image3.png'
import "../../App.css";
const Testimonials = () => {
  return (
    <section className="testimonial-premium">
      <div className="testimonial-blur-bg"></div>

      <div className="testimonial-container">
        <div className="testimonial-section-header">
          <span className="testimonial-eyebrow">Community Voice</span>
          <h2>Loved by <span>Thousands</span></h2>
          <p>We take pride in delivering freshness. Here is what our community has to say about their DailyPantry experience.</p>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card testimonial-reveal">
            <div className="testimonial-card-top">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <i className="fas fa-quote-right testimonial-quote-mark"></i>
            </div>
            <p className="testimonial-body">“The quality is always excellent and delivery is super fast. This has completely changed how I shop for my kitchen essentials.”</p>
            <div className="testimonial-user-meta">
              <img src={PersonImage1} alt="Ayesha" className="testimonial-user-img" />
              <div className="testimonial-user-info">
                <h5>Ayesha Khan</h5>
                <span><i className="fas fa-location-dot"></i> Karachi, PK</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card testimonial-featured testimonial-reveal">
            <div className="testimonial-card-top">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <i className="fas fa-quote-right testimonial-quote-mark"></i>
            </div>
            <p className="testimonial-body">“Affordable prices with premium quality. The organic selection is unmatched. Shopping is finally stress-free and healthy.”</p>
            <div className="testimonial-user-meta">
              <img src={PersonImage2} alt="Rohan" className="testimonial-user-img" />
              <div className="testimonial-user-info">
                <h5>Rohan Ali</h5>
                <span><i className="fas fa-location-dot"></i> Lahore, PK</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card testimonial-reveal">
            <div className="testimonial-card-top">
              <div className="testimonial-stars">
                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
              </div>
              <i className="fas fa-quote-right testimonial-quote-mark"></i>
            </div>
            <p className="testimonial-body">“Fresh products, quick delivery, and great prices. DailyPantry has become an essential part of my weekly routine!”</p>
            <div className="testimonial-user-meta">
              <img src={PersonImage3} alt="Sarah" className="testimonial-user-img" />
              <div className="testimonial-user-info">
                <h5>Sarah Ahmed</h5>
                <span><i className="fas fa-location-dot"></i> Islamabad, PK</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
