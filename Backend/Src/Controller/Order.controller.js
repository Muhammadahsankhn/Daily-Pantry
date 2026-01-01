import { Product } from "../Models/Product.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) throw new ApiError(404, "Product not found");

    if (product.stock < item.qty)
      throw new ApiError(400, `${product.title} has only ${product.stock} in stock`);

    product.stock -= item.qty;
    await product.save();
  }

  res.status(201).json({ success: true, message: "Order placed successfully" });
});
