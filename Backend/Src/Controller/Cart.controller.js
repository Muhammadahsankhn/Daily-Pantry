import { Cart } from "../Models/Cart.model.js";
import { Product } from "../Models/Product.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

/* ================= ADD ITEM TO CART ================= */
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1, size } = req.body;

  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product || !product.isActive)
    throw new ApiError(404, "Product not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId && item.size === size
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
    existingItem.subtotal = existingItem.quantity * product.price;
  } else {
    cart.items.push({
      product: productId,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: Number(quantity),
      subtotal: Number(quantity) * product.price,
      size: size || null,
    });
  }

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

/* ================= GET CART ================= */
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product",
    "title price image"
  );

  if (!cart || cart.items.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, { items: [] }, "Cart is empty")
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

/* ================= UPDATE ITEM QUANTITY ================= */
const updateItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1)
    throw new ApiError(400, "Quantity must be at least 1");

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) throw new ApiError(404, "Item not found in cart");

  item.quantity = Number(quantity);
  item.subtotal = item.price * item.quantity;

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated successfully"));
});

/* ================= REMOVE ITEM ================= */
const removeItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  const index = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (index === -1) throw new ApiError(404, "Item not found in cart");

  cart.items.splice(index, 1);

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item removed from cart successfully"));
});

/* ================= CLEAR CART ================= */
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = [];
  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart cleared successfully"));
});

export { addToCart, getCart, updateItemQuantity, removeItem, clearCart };
