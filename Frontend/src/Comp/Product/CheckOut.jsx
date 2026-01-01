import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api/Api.js";
import "../../App.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postal: "",
    phone: "",
  });
  const [error, setError] = useState("");

  // FILTER OUT INVALID ITEMS
  const validCartItems = cartItems.filter(
    (item) =>
      item &&
      typeof item.price === "number" &&
      typeof item.qty === "number" &&
      item._id &&
      item.name
  );

  // Calculate totals safely
  const subtotal = validCartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const tax = +(subtotal * 0.05).toFixed(2); // 5% tax
  const shippingCharge = 200;
  const total = +(subtotal + tax + shippingCharge).toFixed(2);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.phone
    ) {
      setError("Please fill in all delivery fields before placing the order.");
      return;
    }

    setError("");

    try {
      await api.post("/checkout/place", {
        name: form.firstName + " " + form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postal: form.postal || "",
        shippingMethod: "standard",
        subtotal: subtotal,
        tax: tax,
        total: total,
        items: validCartItems.map((item) => ({
          productId: item._id,
          qty: item.qty,
        })),
      });

      setOrderPlaced(true);
      clearCart();
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      console.error("Order error:", err);
      alert(
        "Cannot place order: " + (err.response?.data?.message || err.message)
      );
    }
  };

  if (validCartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-root">
        <div style={{ padding: 80, textAlign: "center", opacity: 0.7 }}>
          <h3>Your cart is empty</h3>
          <p>Please shop first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-root">
      <div className="checkout-grid">
        {/* FORM SIDE */}
        <section className="checkout-form-side">
          <span className="checkout-step-label">
            <i className="fa-solid fa-shield-check"></i> Secure Checkout
          </span>
          <h2>Delivery Information</h2>
          <form>
            {/* form inputs unchanged */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="checkout-input-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleInputChange} required />
              </div>
              <div className="checkout-input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="checkout-input-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleInputChange} required />
            </div>

            <div className="checkout-input-group">
              <label>Shipping Address</label>
              <input type="text" name="address" value={form.address} onChange={handleInputChange} required />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="checkout-input-group">
                <label>City</label>
                <input type="text" name="city" value={form.city} onChange={handleInputChange} required />
              </div>
              <div className="checkout-input-group">
                <label>Postal Code</label>
                <input type="text" name="postal" value={form.postal} onChange={handleInputChange} />
              </div>
            </div>

            <div className="checkout-input-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} required />
            </div>

            <h2 style={{ marginTop: "60px" }}>Payment</h2>
            <div className="checkout-pay-options">
              <div className="checkout-pay-card checkout-active">
                <i className="fa-solid fa-truck-fast"></i>
                <div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Cash on Delivery</div>
                <small>Pay when you receive your order</small>
              </div>
            </div>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

            <button type="button" className="checkout-btn-pay" onClick={handlePlaceOrder}>
              Place Order <i className="fa-solid fa-arrow-right" style={{ marginLeft: 10 }}></i>
            </button>
          </form>
        </section>

        {/* SUMMARY SIDE */}
        <section className="checkout-summary-side">
          <h3>Order Details</h3>
          <div className="checkout-order-scroll">
            {validCartItems.map((item) => (
              <div className="checkout-order-mini-item" key={item._id}>
                <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <img src={item.image || "/no-image.png"} alt={item.name} />
                  <div className="checkout-item-detail">
                    <strong>{item.name}</strong>
                    <small>Qty: {item.qty} ({item.unit})</small>
                  </div>
                </div>
                <span>Rs {item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="checkout-price-breakdown">
            <div className="checkout-breakdown-row">
              <span>Cart Subtotal</span><span>Rs {subtotal}</span>
            </div>
            <div className="checkout-breakdown-row">
              <span>Delivery Charge</span><span style={{ fontWeight: 800 }}>Rs{shippingCharge}</span>
            </div>
            <div className="checkout-breakdown-row">
              <span>Estimated Tax (5%)</span><span>Rs {tax}</span>
            </div>
            <div className="checkout-breakdown-row checkout-total-row">
              <span>Total</span><span>Rs {total}</span>
            </div>
          </div>
        </section>
      </div>

      {orderPlaced && (
        <div className="vault-overlay">
          <div className="vault-card">
            <div className="vault-scanner"></div>
            <div className="vault-header">
              <div className="vault-icon-wrapper">
                <div className="icon-pulse"></div>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <span className="status-badge">Payment Verified</span>
            </div>
            <div className="vault-body">
              <h2>Order Secured</h2>
              <p>Your transaction has been encrypted and processed. Your fresh haul is now in queue.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;


// import React, { useState } from "react";
// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";
// import api from "../api/Api.js";
// import "../../App.css";

// const Checkout = () => {
//   const { cartItems, clearCart } = useCart();
//   const navigate = useNavigate();
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

//   const handlePlaceOrder = async () => {
//     try {
//       await api.post("/orders", {
//         items: cartItems.map(item => ({
//           productId: item._id,
//           qty: item.qty
//         }))
//       });

//       setOrderPlaced(true);
//       clearCart();

//       setTimeout(() => navigate("/"), 2500);
//     } catch (err) {
//       console.error("Order error:", err);
//       alert("Cannot place order: " + err.response?.data?.message || err.message);
//     }
//   };

//   if (cartItems.length === 0 && !orderPlaced) {
//     return <div className="checkout-root"><div style={{ padding: 80, textAlign: "center", opacity: 0.7 }}><h3>Your cart is empty</h3><p>Please shop first</p></div></div>;
//   }

//   return (
//     <div className="checkout-root">
//       <div className="checkout-grid">
//         {/* LEFT SIDE */}
//         <section className="checkout-form-side">
//           <span className="checkout-step-label"><i className="fa-solid fa-shield-check"></i> Secure Checkout</span>
//           <h2>Delivery Information</h2>
//           <form>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//               <div className="checkout-input-group"><label>First Name</label><input type="text" placeholder="First Name" /></div>
//               <div className="checkout-input-group"><label>Last Name</label><input type="text" placeholder="Last Name" /></div>
//             </div>
//             <div className="checkout-input-group"><label>Shipping Address</label><input type="text" placeholder="Building, Street, Landmark" /></div>
//             <div className="checkout-input-group"><label>Phone Number</label><input type="tel" placeholder="+92 300 1234567" /></div>
//             <h2 style={{ marginTop: "60px" }}>Payment</h2>
//             <div className="checkout-pay-options">
//               <div className="checkout-pay-card checkout-active"><i className="fa-solid fa-truck-fast"></i><div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Cash</div><small>Pay on delivery</small></div>
//               <div className="checkout-pay-card"><i className="fa-solid fa-credit-card"></i><div style={{ fontWeight: 800, fontSize: "1.1rem" }}>Card</div><small>Visa / Mastercard</small></div>
//             </div>
//             <button type="button" className="checkout-btn-pay" onClick={handlePlaceOrder}>Place Order <i className="fa-solid fa-arrow-right" style={{ marginLeft: 10 }}></i></button>
//           </form>
//         </section>

//         {/* RIGHT SIDE */}
//         <section className="checkout-summary-side">
//           <h3>Order Details</h3>
//           <div className="checkout-order-scroll">
//             {cartItems.map((item) => (
//               <div className="checkout-order-mini-item" key={item._id}>
//                 <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
//                   <img src={item.image} alt={item.name} />
//                   <div className="checkout-item-detail"><strong>{item.name}</strong><small>Qty: {item.qty} ({item.unit})</small></div>
//                 </div>
//                 <span>Rs {item.price * item.qty}</span>
//               </div>
//             ))}
//           </div>

//           <div className="checkout-price-breakdown">
//             <div className="checkout-breakdown-row"><span>Cart Subtotal</span><span>Rs {subtotal}</span></div>
//             <div className="checkout-breakdown-row"><span>Delivery Charge</span><span style={{ fontWeight: 800 }}>FREE</span></div>
//             <div className="checkout-breakdown-row"><span>Estimated Tax</span><span>Rs 0.00</span></div>
//             <div className="checkout-breakdown-row checkout-total-row"><span>Total</span><span>Rs {subtotal}</span></div>
//           </div>
//         </section>
//       </div>

//       {orderPlaced && (
//         <div className="vault-overlay">
//           <div className="vault-card">
//             <div className="vault-scanner"></div>
//             <div className="vault-header">
//               <div className="vault-icon-wrapper"><div className="icon-pulse"></div><i className="fa-solid fa-shield-halved"></i></div>
//               <span className="status-badge">Payment Verified</span>
//             </div>
//             <div className="vault-body">
//               <h2>Order Secured</h2>
//               <p>Your transaction has been encrypted and processed. Your fresh haul is now in queue.</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;
