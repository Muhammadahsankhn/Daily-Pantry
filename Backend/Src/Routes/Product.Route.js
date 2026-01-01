import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} from "../Controller/Product.controller.js";

import { upload } from "../Middleware/Multer.middleware.js";

const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.put("/update/:id", upload.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

router.get("/", getAllProduct);
router.get("/:id", getProductById);

export default router;
