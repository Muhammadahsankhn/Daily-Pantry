import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import api from "../api/Api.js";

// Base URL for images
const IMAGE_BASE_URL = "http://localhost:5000/uploads";

const ProductPage = ({ themeClass, badge, title, titleAccent, description, category }) => {
  const { addToCart, cartItems } = useCart(); // <- get cartItems here!
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/products?category=${category}`);
        const list = (res.data.data || []).filter(p => p.category === category);
        setProducts(list);
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className={themeClass}>
      <header className="product-hero">
        <div className="hero-content">
          <span className="hero-badge">{badge}</span>
          <h1>{title} <span>{titleAccent}</span></h1>
          <p>{description}</p>
        </div>
      </header>

      <main className="store-section">
        <div className="product-grid">
          {products.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>No products found</p>
          ) : (
            products.map((item) => {
              const currentQtyInCart = cartItems.find(p => p._id === item._id)?.qty || 0;

              return (
                <div className="product-card" key={item._id}>
                  <div className="img-wrapper">
                    <div className={`admin-stock-badge ${item.stock > 0 ? "admin-in" : "admin-out"}`}>
                      {item.stock > 0 ? `${item.stock} Available` : "Sold Out"}
                    </div>
                    <img
                      src={`${IMAGE_BASE_URL}/${item.image}`}
                      alt={item.title}
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                  </div>

                  <div className="info-stack">
                    <div className="info-box">
                      <small>{item.label || "Fresh Selection"}</small>
                      <h3>{item.title}</h3>
                    </div>

                    <div className="footer-row">
                      <div>
                        <div className="price-label">
                          Rs {item.price}
                          <sub>/{item.unit || "unit"}</sub>
                        </div>
                      </div>

                      <button
                        className="cart-pill"
                        onClick={() => {
                          if (currentQtyInCart < item.stock) {
                            addToCart({
                              _id: item._id,
                              name: item.title,
                              price: item.price,
                              unit: item.unit || "unit",
                              tag: item.category,
                              image: `${IMAGE_BASE_URL}/${item.image}`,
                              stock: item.stock,
                            });
                          } else {
                            alert(`Only ${item.stock} items available`);
                          }
                        }}
                        disabled={item.stock <= 0}
                        style={{ opacity: item.stock <= 0 ? 0.5 : 1 }}
                      >
                        {item.stock <= 0
                          ? "Empty"
                          : <>Add <i className="fa-solid fa-plus"></i></>}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
