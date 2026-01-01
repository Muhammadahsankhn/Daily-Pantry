import mongoose, { Schema } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    subscribeAt: {  // Fixed typo: subsrcbeAt → subscribeAt
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Fixed capitalization: TimeStamps → timestamps
);

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
