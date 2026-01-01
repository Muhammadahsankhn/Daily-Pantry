import React from "react";
import "../../App.css";
import FeatureImg2 from '../../assets/Featured-Products-Image2.png'
import FeatureImg1 from '../../assets/Featured-Products-Image1.png'
import FeatureImg3 from '../../assets/Featured-Products-Image3.png'



const FeaturedProduct = () => {
  return (
 <section className="featured-premium-featured">
    <div className="featured-featured-container">
        
        <div className="featured-section-header reveal">
            <span className="featured-eyebrow">Curated Selection</span>
            <h2>Best <span>Sellers</span></h2>
            <p>Our most-loved farm-fresh essentials, handpicked by the community.</p>
        </div>

        <div className="featured-featured-grid">
            <div className="featured-product-card reveal">
                <div className="featured-product-visual">
                    <span className="featured-discount-tag">-20%</span>
                    <div className="featured-quick-actions">
                        <button className="featured-action-btn"><i className="fa-regular fa-heart"></i></button>
                        <button className="featured-action-btn"><i className="fa-regular fa-eye"></i></button>
                    </div>
                    <img src={FeatureImg2} alt="Apples"/>
                </div>
                
                <div className="featured-product-info">
                    <div className="featured-rating-strip">
                        <div className="featured-stars-mini">
                              <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <span>(4.9)</span>
                    </div>
                    <h3>Fresh Avocado</h3>
                    <p className="featured-unit-info">Per kg approx</p>
                    
                    
                </div>
            </div>

            <div className="featured-product-card reveal">
                <div className="featured-product-visual">
                    <span className="featured-discount-tag">-15%</span>
                    <div className="featured-quick-actions">
                        <button className="featured-action-btn"><i className="fa-regular fa-heart"></i></button>
                        <button className="featured-action-btn"><i className="fa-regular fa-eye"></i></button>
                    </div>
                    <img src={FeatureImg1} alt="Milk"/>
                </div>
                
                <div className="featured-product-info">
                    <div className="featured-rating-strip">
                        <div className="featured-stars-mini">
                              <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <span>(4.6)</span>
                    </div>
                    <h3>Organic Full Cream Milk</h3>
                    <p className="featured-unit-info">1 Liter Bottle</p>
                   
                </div>
            </div>

            <div className="featured-product-card reveal">
                <div className="featured-product-visual">
                    <span className="featured-discount-tag hot">HOT</span>
                    <div className="featured-quick-actions">
                        <button className="featured-action-btn"><i className="fa-regular fa-heart"></i></button>
                        <button className="featured-action-btn"><i className="fa-regular fa-eye"></i></button>
                    </div>
                    <img src={FeatureImg3} alt="Bananas"/>
                </div>
                
                <div className="featured-product-info">
                    <div className="featured-rating-strip">
                        <div className="featured-stars-mini">
                              <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
  <i className="fa-solid fa-star"></i>
                        </div>
                        <span>(5.0)</span>
                    </div>
                    <h3>Premium Tomatos</h3>
                    <p className="featured-unit-info">Dozen (12 pcs)</p>
                    
                </div>
            </div>
        </div>
    </div>
</section>

  );
};

export default FeaturedProduct;
