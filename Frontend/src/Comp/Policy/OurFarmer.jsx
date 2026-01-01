import React, { useEffect } from "react";
import '../../App.css'
function Farmers() {

  useEffect(() => {
    // Intersection Observer: Change Active Image on Scroll
    const observerOptions = { root: null, threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.getAttribute('data-target');
          document.querySelectorAll('.farmer-image-wrapper').forEach(img => {
            img.classList.remove('active');
          });
          document.getElementById(targetId).classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.farmer-content-step').forEach(step => {
      observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="farmer-body">

      {/* HERO SECTION */}
      <section className="farmer-hero">
        <div className="farmer-hero-content">
          <span className="farmer-step-label">Meet Our Heroes</span>
          <h1>The Hands Behind Your <span>Harvest</span></h1>
          <p>Directly connecting you to local farmers who prioritize soil health, traditional wisdom, and your family's nutrition.</p>
        </div>
      </section>

      {/* SPLIT SCROLL FARMER SECTION */}
      <section className="farmer-split-scroll-container">

        {/* Sticky Image Column */}
        <div className="farmer-sticky-image-box">

          <div className="farmer-image-wrapper active" id="img1">
            <img src="https://img.freepik.com/premium-photo/happy-farmer-standing-proudly-vibrant-crop-field_1110958-85487.jpg" alt="Farmer Ahmad" />
          </div>

          <div className="farmer-image-wrapper" id="img2">
            <img src="https://img.freepik.com/premium-photo/female-woman-worker-posing-cow-dairy-farm-out-door-ranch-cowshed-farm_641503-397120.jpg" alt="Farmer Fatima" />
          </div>

          <div className="farmer-image-wrapper" id="img3">
            <img src="https://www.shutterstock.com/image-photo/portrait-modern-bearded-farmer-man-600nw-2296014059.jpg" alt="Farmer Bilal" />
          </div>

        </div>

        {/* Scrollable Content Column */}
        <div className="farmer-scroll-content-box">

          <div className="farmer-content-step" data-target="img1">
            <span className="farmer-farmer-tag">Organic Specialist</span>
            <h2>Ahmad’s Citrus Groves</h2>
            <p>Based in the sun-drenched plains of Sargodha, Ahmad has spent two decades perfecting chemical-free citrus farming. His soil is treated with fermented organic matter, ensuring every orange is bursting with vitamin C and natural sugars.</p>
            <ul className="farmer-farm-perks">
              <li><i className="fa-solid fa-leaf"></i> Zero Synthetic Pesticides</li>
              <li><i className="fa-solid fa-droplet"></i> Rain-Water Harvesting</li>
              <li><i className="fa-solid fa-sun"></i> Sun-Ripened Guarantee</li>
            </ul>
          </div>

          <div className="farmer-content-step" data-target="img2">
            <span className="farmer-farmer-tag">Dairy Expert</span>
            <h2>Fatima’s Organic Dairy</h2>
            <p>Fatima believes that happy animals produce the best milk. Her free-range cattle graze on diverse clover pastures, producing milk that is naturally rich in Omega-3. No hormones, no antibiotics—just pure, creamy goodness.</p>
            <ul className="farmer-farm-perks">
              <li><i className="fa-solid fa-cow"></i> 100% Grass-Fed Cattle</li>
              <li><i className="fa-solid fa-heart"></i> Ethical Milking Practices</li>
              <li><i className="fa-solid fa-flask-vial"></i> Hormone-Free Purity</li>
            </ul>
          </div>

          <div className="farmer-content-step" data-target="img3">
            <span className="farmer-farmer-tag">Soil Alchemist</span>
            <h2>Bilal’s Root Vegetables</h2>
            <p>Bilal treats his land like a living organism. By using ancient crop rotation and bio-char enrichment, he grows carrots and potatoes that possess an earthy depth of flavor you won't find in industrial supermarkets.</p>
            <ul className="farmer-farm-perks">
              <li><i className="fa-solid fa-seedling"></i> Heirloom Seed Varieties</li>
              <li><i className="fa-solid fa-earth-asia"></i> Regenerative Soil Health</li>
              <li><i className="fa-solid fa-hand-holding-hand"></i> Small-Batch Harvesting</li>
            </ul>
          </div>

        </div>
      </section>



    </div>
  );
}

export default Farmers;
