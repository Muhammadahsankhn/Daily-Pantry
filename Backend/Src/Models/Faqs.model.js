import mongoose from "mongoose";

const Faqs_Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    answered: {
      type: String,
      default: "",
    },

    status:{
        type:"string",
        enum:["Answered","Pending"],
        default:"Pending"
    }
  },
  { timestamps: true }
);

export const Faqs = mongoose.model("Faqs", Faqs_Schema);
