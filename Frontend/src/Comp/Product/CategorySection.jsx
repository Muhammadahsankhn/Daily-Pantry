import React from "react";
import "../../App.css";
import catogoryimage1 from '../../assets/catogory-image.png'
import catogoryimage2 from '../../assets/catogory-image1.png'
import catogoryimage3 from '../../assets/catogory-image3.png'
import catogoryimage4 from '../../assets/catogory-image4.png'
import { Link } from "react-router-dom";
const CategorySection = () => {
  return (
    <section id="Categories" className="gm-category-section">
      <div className="gm-section-header reveal">
        <span className="gm-eyebrow">The Collection</span>
        <h2>
          Shop by <span>Category</span>
        </h2>
        <p className="gm-category-sub">
          Hand-picked freshness delivered from sustainable farms to your doorstep.
        </p>
      </div>

      <div className="gm-category-grid">
        <Link to="/Fruits-Page" className="gm-category-card reveal">
          <div className="gm-card-bg"></div>
          <div className="gm-item-count">9 Items</div>
          <div className="gm-category-img">
            <img src={catogoryimage1} alt="Fruits" />
          </div>
          <div className="gm-category-content">
            <h3>Fresh Fruits</h3>
            <p>Seasonal & Tropical</p>
            <div className="gm-explore-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </Link>

        <Link to="/Vegetables-Page" className="gm-category-card reveal">
          <div className="gm-card-bg"></div>
          <div className="gm-item-count">9 Items</div>
          <div className="gm-category-img">
            <img src={catogoryimage2} alt="Vegetables" />
          </div>
          <div className="gm-category-content">
            <h3>Vegetables</h3>
            <p>Root & Leafy Greens</p>
            <div className="gm-explore-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </Link>

        <Link to="/Dairy-Page" className="gm-category-card reveal">
          <div className="gm-card-bg"></div>
          <div className="gm-item-count">7 Items</div>
          <div className="gm-category-img">
            <img src={catogoryimage4} alt="Dairy" />
          </div>
          <div className="gm-category-content">
            <h3>Dairy Products</h3>
            <p>Farm-Fresh Milk & Eggs</p>
            <div className="gm-explore-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </Link>

        <Link to="/Bakery-Page" className="gm-category-card reveal">
          <div className="gm-card-bg"></div>
          <div className="gm-item-count">9 Items</div>
          <div className="gm-category-img">
            <img src={catogoryimage3} alt="Bakery" />
          </div>
          <div className="gm-category-content">
            <h3>Fresh Bakery</h3>
            <p>Artisan Sourdough</p>
            <div className="gm-explore-btn">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategorySection;
