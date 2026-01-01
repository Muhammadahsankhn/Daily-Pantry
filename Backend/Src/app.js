

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// ROUTES
import ProductRoute from "./Routes/Product.Route.js";
// ---------------- ROUTES ----------------
import UserRoute from "./Routes/User.Route.js";
// import ProductRoute from "./Routes/Product.Route.js";
import SearchRoute from "./Routes/Search.Route.js";
import NewsletterRoute from "./Routes/newsletter.Route.js";
// import LikedRoute from "./Routes/Like.Route.js";
import ContactRoute from "./Routes/Contact.Route.js";
import CartRoute from "./Routes/Cart.Route.js";
import OrderRoute from "./Routes/Checkout.Route.js";
import PlaceRoute from "./Routes/Order.Route.js";
const app = express();
const __dirname = path.resolve();

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  SERVE UPLOADS 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ROUTES
app.use("/api/v1/products", ProductRoute);
// ---------------- API ROUTES ----------------
app.use("/api/v1/users", UserRoute);
// app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/search", SearchRoute);
app.use("/api/v1/newsletter", NewsletterRoute);
// app.use("/api/v1/favourites", LikedRoute);
app.use("/api/v1/contact", ContactRoute);
app.use("/api/v1/cart", CartRoute);
app.use("/api/v1/checkout", OrderRoute);
app.use("/api/v1/orders",PlaceRoute );

// HEALTH
app.get("/", (req, res) => {
  res.send("API running");
});

// ERROR HANDLER (LAST)
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
