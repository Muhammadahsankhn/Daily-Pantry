import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/Api.js";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart/");
        setCartItems(res.data.data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
      // Update local state
      setCartItems((prev) => {
        const existing = prev.find((p) => p._id === product._id);
        if (existing) {
          return prev.map((p) =>
            p._id === product._id ? { ...p, qty: p.qty + 1 } : p
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const removeFromCart = async (_id) => {
    try {
      await api.delete(`/cart/remove/${_id}`);
      setCartItems((prev) => prev.filter((p) => p._id !== _id));
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  };

  const updateQty = async (_id, amount) => {
    const item = cartItems.find((p) => p._id === _id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + amount);
    try {
      await api.put(`/cart/update/${_id}`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((p) => (p._id === _id ? { ...p, qty: newQty } : p))
      );
    } catch (err) {
      console.error("Update quantity failed:", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
