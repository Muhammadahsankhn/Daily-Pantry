import React, { useEffect } from "react";
import "../../App.css";
import AboutusImage1 from '../../assets/About-Us-Image1.png'
import AboutusImage2 from '../../assets/About-Us-Image2.png'
import AboutusImage3 from '../../assets/About-Us-Image3.png'
import PersonImage1 from '../../assets/About-Us-PersonImage1.png'
import PersonImage2 from '../../assets/About-Us-PersonImage2.png'
import PersonImage3 from '../../assets/About-Us-PersonImage3.png'

const AboutUs = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.15 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aboutus-active");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".aboutus-reveal").forEach(el => observer.observe(el));
  }, []);

  return (
    <>
      <div id="header"></div>

      {/* HERO SECTION */}
      <section className="aboutus-premium-hero">
        <div className="aboutus-hero-grid">

          <div className="aboutus-hero-text-content">
            <span className="aboutus-badge">Pure Raw Honest</span>

            <h1 className="aboutus-reveal aboutus-active">
              Rooted in <br />
              <span style={{ color: "transparent", WebkitTextStroke: "1.5px var(--primary)" }}>
                Integrity.
              </span>
            </h1>

            <p
              className="aboutus-reveal aboutus-active"
              style={{ fontSize: "1.2rem", color: "#555", marginBottom: "40px", maxWidth: "500px" }}
            >
              We are a collective of soil-scientists, farmers, and tech-optimists redefining the journey of food from the earth to your hands.
            </p>

            <div className="aboutus-reveal aboutus-active">
              <button
                style={{
                  padding: "20px 45px",
                  borderRadius: "100px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Download Impact Report
              </button>
            </div>
          </div>

          <div className="aboutus-hero-visual-stack aboutus-reveal aboutus-active">
            <div className="aboutus-bg-pattern"></div>

            <div className="aboutus-main-frame">
              <img src={AboutusImage1} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Our Farm" />
            </div>

            <div className="aboutus-floating-accent-card">
              <h2 style={{ fontFamily: "Syne", fontSize: "2.5rem" }}>98%</h2>
              <p style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", marginTop: "5px" }}>
                Plastic-Free Supply Chain
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* BENTO SECTION */}
      <section className="aboutus-bento-section">
        <div className="aboutus-section-header aboutus-reveal">
          <h2 style={{ fontFamily: "Syne", fontSize: "3rem", marginBottom: "20px" }}>The Ecosystem</h2>
          <p style={{ opacity: 0.6 }}>How we manage to be faster than your local supermarket.</p>
        </div>

        <div className="aboutus-bento-container">

          <div className="aboutus-bento-item aboutus-item-large aboutus-item-tall aboutus-reveal">
            <h3>Traceability <span className="aboutus-highlight-text">Matrix</span></h3>
            <p style={{ marginTop: "20px", opacity: 0.8, fontSize: "1.1rem" }}>
              Every item in your box carries a unique OriginID. Scan it to see the exact time of harvest, the soil pH level, and the name of the farmer who picked it.
            </p>
            <img src={AboutusImage2} style={{ width: "100%", borderRadius: "20px", marginTop: "30px", height: "250px", objectFit: "cover" }} />
          </div>

          <div className="aboutus-bento-item aboutus-item-small aboutus-reveal" style={{ background: "var(--accent)", color: "var(--primary)" }}>
            <h3>50 Miles</h3>
            <p>Our maximum sourcing radius to ensure nutrient density.</p>
          </div>

          <div className="aboutus-bento-item aboutus-item-small aboutus-reveal">
            <h3>Zero Cold Storage</h3>
            <p>We don't freeze. We deliver. Freshness in its purest state.</p>
          </div>

          <div className="aboutus-bento-item aboutus-item-med aboutus-reveal">
            <h3>Regenerative <span className="aboutus-highlight-text">Methods</span></h3>
            <p>Supporting farms that give back more carbon to the soil than they take.</p>
          </div>

          <div className="aboutus-bento-item aboutus-item-med aboutus-reveal" style={{ border: "1px solid var(--accent)" }}>
            <h3>Fair-Trade Plus</h3>
            <p>Paying 25% above market rates to sustain rural livelihoods.</p>
          </div>

        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="aboutus-team-section">
        <div className="aboutus-section-header aboutus-reveal">
          <h2 style={{ fontFamily: "Syne", fontSize: "3rem", color: "var(--primary)" }}>The Architects</h2>
          <p>Meet the minds behind the harvest.</p>
        </div>

        <div className="aboutus-team-grid">
  {[
    [PersonImage1, "Dr. Arlo Finch", "Chief Agronomist"],
    [PersonImage2, "Elena Rossi", "Sustainability Director"],
    [PersonImage3, "Marcus Thorne", "Operations Lead"]
  ].map(([img, name, role], i) => (
    <div className="aboutus-member-card aboutus-reveal" key={i}>
      <img src={img} className="aboutus-member-img" alt={name} />
      <div className="aboutus-member-info">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  ))}
</div>

      </section>

      {/* ARCH SECTION */}
      <section className="aboutus-arch-section">
        <div className="aboutus-arch-container">

          <div className="aboutus-arch-visual">
            <div className="aboutus-sticky-image-container">
              <img src={AboutusImage3} alt="Sustainable Earth" />
              <div className="aboutus-arch-overlay">
                <span className="aboutus-arch-label">Built to Last</span>
              </div>
            </div>
          </div>

          <div className="aboutus-arch-content">

            <div className="aboutus-arch-step aboutus-reveal">
              <div className="aboutus-step-num">01</div>
              <h3>The Soil Protocol</h3>
              <p>Architecture begins with the foundation. We analyze the microbial health of every acre we source from.</p>
            </div>

            <div className="aboutus-arch-step aboutus-reveal">
              <div className="aboutus-step-num">02</div>
              <h3>Logistical Skeleton</h3>
              <p>Our supply chain is a masterpiece of efficiency. We use decentralized sorting hubs to move produce quickly.</p>
            </div>

            <div className="aboutus-arch-step aboutus-reveal">
              <div className="aboutus-step-num">03</div>
              <h3>The Human Pillar</h3>
              <p>A business is only as strong as its people. We invest 10% of our annual profits directly into farmer cooperatives.</p>
            </div>

          </div>
        </div>
      </section>

      
    </>
  );
};

export default AboutUs;
