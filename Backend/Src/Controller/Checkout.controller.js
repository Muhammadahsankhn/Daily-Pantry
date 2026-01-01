import { Order } from "../Models/Checkout.model.js";
import { Cart } from "../Models/Cart.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

// ---------------- Place Order ----------------
const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, email, phone, address, city, postal, shippingMethod } = req.body;

  if (!name || !email || !phone || !address || !city) {
    throw new ApiError(400, "All shipping fields are required");
  }

  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // Check stock availability before creating order
  for (const item of cart.items) {
    if (item.qty > item.product.stock) {
      throw new ApiError(
        400,
        `Not enough stock for ${item.product.title}. Available: ${item.product.stock}`
      );
    }
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const taxRate = 0.05;
  const tax = Number((subtotal * taxRate).toFixed(2));
  const shippingCharge = subtotal >= 1500 ? 0 : 100; // Example rule
  const total = Number((subtotal + tax + shippingCharge).toFixed(2));

  // Create order
  const order = await Order.create({
    user: userId,
    items: cart.items.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      subtotal: item.product.price * item.quantity,
      size: item.size || "",
      image: item.product.image,
    })),
    shipping: {
      method: shippingMethod,
      charge: shippingCharge,
    },
    tax,
    subtotal,
    total,
    shippingAddress: { name, email, phone, address, city, postal },
  });

  // Reduce product stock permanently
  for (const item of cart.items) {
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});




// ---------------- Get Orders (User) ----------------



const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User orders fetched successfully"));
});





// ---------------- Get Single Order ----------------


const getOrderById = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId).populate("items.product");

  if (!order)
     throw new ApiError(404, "Order not found");


  if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    throw new ApiError(403, "Not authorized to view this order");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});





// ---------------- Admin: Get All Orders ----------------


const getAllOrders = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") 
    throw new ApiError(403, "Admin access only");

  const orders = await Order.find().sort({ createdAt: -1 });
  return res
  .status(200)
  .json(new ApiResponse(200, orders, "All orders fetched"));
});


// ---------------- Admin: Update Order Status ----------------
const updateOrderStatus = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") 
    throw new ApiError(403, "Admin access only");

  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order not found");

  if (status)
     {
        order.status = status;
    }

  if (paymentStatus){   
     order.paymentStatus = paymentStatus;
}
  await order.save();
  return res
  .status(200)
  .json(
    new ApiResponse(200, order, "Order updated successfully"));
});

export {
  placeOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
