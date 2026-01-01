import express from "express";
import { placeOrder } from "../Controller/Order.controller.js";

const router = express.Router();

router.post("/", placeOrder);

export default router;
