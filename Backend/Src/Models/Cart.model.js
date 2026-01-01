import mongoose from "mongoose";
const { Schema } = mongoose;

const Cart_Schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String },
        price: { type: Number },
        image: { type: String },
        quantity: { type: Number, default: 1, min: 1 },
        subtotal: { type: Number },
        size: { type: String }, // optional
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", Cart_Schema);
