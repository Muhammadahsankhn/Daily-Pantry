import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/Api.js";
import Popup from "../Security/PopUp.jsx";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. FIX: Initialize State from LocalStorage (Cache)
  // This prevents the cart from flashing empty on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [popup, setPopup] = useState({ show: false, message: "" });

  const triggerPopup = (message) => {
    setPopup({ show: true, message });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, show: false }));
    }, 2500);
  };

  const handleClosePopup = () => {
    setPopup({ show: false, message: "" });
  };

  const isLoggedIn = () => !!localStorage.getItem("token");

  // 2. FIX: Sync State to LocalStorage (Whenever cart changes)
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 3. Load Cart from API (Source of Truth)
  useEffect(() => {
    const fetchCart = async () => {
      // If not logged in, clear everything immediately
      if (!isLoggedIn()) {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        return;
      }

      try {
        const res = await api.get("/cart/");
        if (res.data.data.items) {
          // Update State (which auto-updates LocalStorage via Effect #2)
          setCartItems(res.data.data.items);
        }
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        // If API fails, we still have the LocalStorage cache so the user sees their items!
      }
    };
    fetchCart();
  }, []);

  // --- ACTIONS (Strict Mode) ---

  const addToCart = async (product) => {
    if (!isLoggedIn()) {
      triggerPopup("Please Login to add items!");
      return;
    }

    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });

      setCartItems((prev) => {
        const existing = prev.find((p) => String(p._id) === String(product._id));
        if (existing) {
          return prev.map((p) =>
            String(p._id) === String(product._id) ? { ...p, qty: p.qty + 1 } : p
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
      triggerPopup("Product added to cart!");
    } catch (err) {
      triggerPopup("Failed to add: " + (err.response?.data?.message || err.message));
    }
  };

  const removeFromCart = async (_id) => {
    if (!isLoggedIn()) {
      triggerPopup("Please Login to manage cart!");
      return;
    }

    try {
      await api.delete(`/cart/remove/${_id}`);
      setCartItems((prev) => prev.filter((p) => String(p._id) !== String(_id)));
      triggerPopup("Product removed");
    } catch (err) {
      triggerPopup("Remove failed: " + (err.message || "Error"));
    }
  };

  const updateQty = async (_id, amount) => {
    if (!isLoggedIn()) return;

    const item = cartItems.find((p) => String(p._id) === String(_id));
    if (!item) return;

    const newQty = Math.max(1, item.qty + amount);

    try {
      await api.put(`/cart/update/${_id}`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((p) => (String(p._id) === String(_id) ? { ...p, qty: newQty } : p))
      );
      triggerPopup("Cart updated");
    } catch (err) {
      triggerPopup("Update failed: " + (err.message || "Error"));
    }
  };

  const clearCart = async () => {
    if (!isLoggedIn()) return;

    try {
      await api.delete("/cart/clear");
      setCartItems([]);
      triggerPopup("Cart cleared");
    } catch (err) {
      triggerPopup("Clear failed: " + (err.message || "Error"));
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
      {popup.show && (
        <Popup message={popup.message} onClose={handleClosePopup} />
      )}
    </CartContext.Provider>
  );
};