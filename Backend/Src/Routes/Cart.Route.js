import express from "express";
import {
  addToCart,
  getCart,
  updateItemQuantity,
  removeItem,
  clearCart,
} from "../Controller/Cart.controller.js";

import { verifyJWT } from "../Middleware/auth.middleware.js";

const router = express.Router();


// ---------------- Cart ----------------

router.use(verifyJWT);
router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update/:productId", updateItemQuantity);
router.delete("/remove/:productId", removeItem);
router.delete("/clear", clearCart);



export default router;
