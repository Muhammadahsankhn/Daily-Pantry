import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        price: Number,
        quantity: { type: Number, default: 1, min: 1 },
        subtotal: Number,
        size: String,
        image: String,
      },
    ],
    shipping: {
      method: { type: String, default: "standard" },
      charge: { type: Number, default: 0 },
    },
    tax: { type: Number, default: 0 },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      address: String,
      city: String,
      postal: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
