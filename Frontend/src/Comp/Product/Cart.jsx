import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function CartSelection() {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  // Filter out invalid items (avoid NaN subtotal)
  const validCartItems = cartItems.filter(item => typeof item.price === 'number' && typeof item.qty === 'number');

  const subtotal = validCartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="Cart-body">
      <div className="Cart-wrapper">
        <div className="Cart-main">
          <div className="Cart-header">
            <h1>Harvest Bag <sup>{validCartItems.length}</sup></h1>
          </div>

          {validCartItems.length === 0 && (
            <p style={{ padding: "40px", opacity: 0.6 }}>
              Your cart is empty — shop first
            </p>
          )}

          {validCartItems.map((item) => (
            <div className="Cart-item" key={item._id}>
              <div className="Cart-item-img-container">
                <img src={item.image || "/no-image.png"} className="Cart-item-img" alt={item.name} />
              </div>

              <div className="Cart-item-info">
                <span className="Cart-item-status">{item.tag}</span>
                <h3>{item.name}</h3>
                <p>{item.unit}</p>

                <button className="Cart-remove-btn" onClick={() => removeFromCart(item._id)}>
                  <i className="fa-solid fa-xmark"></i> Remove
                </button>
              </div>

              <div className="Cart-qty-box">
                <div className="Cart-qty-control">
                  <button
                    className="Cart-qty-btn"
                    onClick={() => updateQty(item._id, -1)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="Cart-qty-btn"
                    onClick={() => updateQty(item._id, 1)}
                  >
                    +
                  </button>
                </div>
                <small>{item.qty} {item.unit}</small>
                <div className="Cart-item-price-tag">
                  Rs {item.price * item.qty}
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="Cart-summary">
          <h3>Order Summary</h3>
          <div className="Cart-summary-row">
            <span>Items Subtotal</span>
            <span>Rs {subtotal}</span>
          </div>
          {/* <div className="Cart-summary-row">
            <span>Eco-Delivery</span>
            <span>Rs 200</span>
          </div> */}
          
          <div className="Cart-summary-row Cart-total-row">
            <span>Total</span>
            <span style={{ fontFamily: "Syne" }}>Rs {subtotal }</span>
          </div>

          <button
            className="Cart-btn-checkout"
            onClick={() => navigate("/checkout")}
            disabled={validCartItems.length === 0}
          >
            Checkout Now <i className="fa-solid fa-leaf"></i>
          </button>
          <p className="Cart-free-shipping">Free shipping on orders above Rs 1500</p>
        </aside>
      </div>
    </div>
  );
}
