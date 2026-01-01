// import express from "express";
// import { subscribeToNewsletter, getAllSubscribers } from "../Controller/Newsletter.controller.js";
// import { verifyJWT } from "../Middleware/auth.middleware.js";

// const router = express.Router();

// router.post("/subscribeToNewsletter", subscribeToNewsletter);
// router.get("/getAllSubscribers", verifyJWT, getAllSubscribers);

// export default router;


import express from "express";
import { subscribeToNewsletter, getAllSubscribers } from "../Controller/Newsletter.controller.js";
 import { verifyJWT } from "../Middleware/auth.middleware.js";
import { Newsletter } from "../Models/Newsletter.model.js";
const router = express.Router();

// Subscribe
router.post("/subscribeToNewsletter", subscribeToNewsletter);

// Get all subscribers (admin)
router.get("/getAllSubscribers", verifyJWT, getAllSubscribers);

router.post("/checkSubscription", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const exists = await Newsletter.findOne({ email: email.toLowerCase() });
    res.status(200).json({ subscribed: !!exists });
  } catch (err) {
    console.error("Check subscription error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
