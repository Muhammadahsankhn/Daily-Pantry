// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     originalPrice: Number,
//     discount: { type: Boolean, default: false },

//     image: { type: String, required: true },

//     category: {
//       type: String,
//       enum: ["Fruits", "Dairy", "Vegetables", "Bakery"],
//       required: true,
//     },

//     stock: { type: Number, required: true },

//     isActive: { type: Boolean, default: true },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Product = mongoose.model("Product", ProductSchema);
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Fruits", "Dairy", "Vegetables", "Bakery"],
      required: true,
    },
    unit: { type: String, default: "unit" },
     label: { type: String, default: "Fresh Selection" },
    image: { type: String, required: true }, // filename only
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", ProductSchema);
