import { Newsletter } from "../Models/Newsletter.model.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

// Subscribe to Newsletter
const subscribeToNewsletter = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Already subscribed" });
    }

    const newSubscriber = await Newsletter.create({ email });

    return res.status(201).json({
      success: true,
      data: newSubscriber,
      message: "Subscribed successfully",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
});

// Get all subscribers
const getAllSubscribers = asyncHandler(async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: subscribers,
      message: "All subscribers fetched successfully",
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error. Please try again later.",
    });
  }
});

export { subscribeToNewsletter, getAllSubscribers };
