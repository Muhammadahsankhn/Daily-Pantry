import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../Controller/Checkout.controller.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";

const router = express.Router();

// ---------------- CheckOut ----------------

router.post("/place", verifyJWT, placeOrder);                
router.get("/user", verifyJWT, getUserOrders);                
router.get("/:id", verifyJWT, getOrderById);                  
router.get("/", verifyJWT, getAllOrders);                     
router.put("/status/:id", verifyJWT, updateOrderStatus);      

export default router;
