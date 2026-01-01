
import fs from "fs";
import path from "path";
import { Product } from "../Models/Product.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";

const UPLOAD_DIR = path.resolve("uploads");

/* ADD PRODUCT */
export const addProduct = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "Image required");

  const product = await Product.create({
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
    image: req.file.filename,
  });

  res.status(201).json({ success: true, data: product });
});

/* UPDATE PRODUCT */
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  Object.assign(product, req.body);

  if (req.file) {
    if (product.image) {
      const oldImg = path.join(UPLOAD_DIR, product.image);
      if (fs.existsSync(oldImg)) fs.unlinkSync(oldImg);
    }
    product.image = req.file.filename;
  }

  await product.save();
  res.json({ success: true, data: product });
});

/* DELETE PRODUCT */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");

  if (product.image) {
    const imgPath = path.join(UPLOAD_DIR, product.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
  }

  await product.deleteOne();
  res.json({ success: true });
});

/* GET ALL PRODUCTS (with optional category filter) */
export const getAllProduct = asyncHandler(async (req, res) => {
  const category = req.query.category; // ✅ filter by category
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json({ success: true, data: products });
});

/* GET ONE PRODUCT */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Not found");
  res.json({ success: true, data: product });
});
