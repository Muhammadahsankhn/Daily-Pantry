import { Product } from "../Models/Product.model.js";
import mongoose from "mongoose";

export const searchItems = async (req, res) => {
  try {
    const query = req.query.q?.trim().toLowerCase();
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Please enter a search term",
      });
    }

    let productResults = [];

    // Check if query is a valid MongoDB ID
    if (mongoose.Types.ObjectId.isValid(query)) {
      const product = await Product.findById(query).select(
        "name image price description sizes category"
      );
      if (product) productResults.push(product);
    } else {
      // Search by name, category, or description
      productResults = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).select("name image price description sizes category");
    }

    // Static pages including updated footer paths
    const staticPages = [
      { name: "Home", path: "/", keywords: ["home", "main", "landing"] },
      { name: "Login", path: "/Login", keywords: ["login", "signin", "account"] },
      { name: "Signup", path: "/Signup", keywords: ["signup", "register", "create account"] },
      { name: "My Account", path: "/My-Account", keywords: ["account", "profile", "dashboard"] },

      { name: "About Us", path: "/About-Us", keywords: ["about", "aboutus", "company"] },
      { name: "Our Farmers", path: "/Our-Farmers", keywords: ["farmers", "growers", "producers"] },
      { name: "Contact Us", path: "/Contact-Us", keywords: ["contact", "support", "message"] },
      { name: "Track Order", path: "/Track-Order", keywords: ["track", "order", "delivery"] },

      { name: "Terms & Conditions", path: "/Terms&Condition", keywords: ["terms", "conditions", "rules"] },
      { name: "Privacy Policy", path: "/Privacy-Policy", keywords: ["privacy", "policy", "data"] },
      { name: "Refund Policy", path: "/Refund-Policy", keywords: ["refund", "return", "exchange"] },
      { name: "FAQs", path: "/FAQs", keywords: ["faq", "questions", "help"] },

      { name: "Fresh Fruits", path: "/Fruits-Page", keywords: ["fruits", "fresh fruits"] },
      { name: "Organic Vegetables", path: "/Vegetables-Page", keywords: ["vegetables", "veggies"] },
      { name: "Dairy & Eggs", path: "/Dairy-Page", keywords: ["dairy", "milk", "eggs"] },
      { name: "Bakery Items", path: "/Bakery-Page", keywords: ["bakery", "bread", "cakes"] },
    ];

    const matchedPages = staticPages
      .filter(
        (page) =>
          page.name.toLowerCase().includes(query) ||
          page.keywords.some((kw) => kw.includes(query) || query.includes(kw))
      )
      .map((page) => ({ ...page, type: "page" }));

    const combinedResults = [
      ...productResults.map((p) => ({ ...p._doc, type: "product" })),
      ...matchedPages,
    ];

    if (combinedResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found",
      });
    }

    res.status(200).json({
      success: true,
      data: combinedResults,
      message: "Search results fetched successfully",
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
