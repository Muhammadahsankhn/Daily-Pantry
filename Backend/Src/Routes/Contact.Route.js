import express from "express";
import {
  sendMessage,
  getMessageById,
  getAllMessages,
  deleteMessage,
} from "../Controller/Contact.controller.js";
import { verifyJWT } from "../Middleware/auth.middleware.js";

const router = express.Router();

// ---------------- Contacr Us ----------------

router.post("/sendMessage", sendMessage);
router.get("/getMessageById/:id", verifyJWT, getMessageById);
router.get("/getAllMessages", verifyJWT, getAllMessages);
router.delete("/deleteMessage/:id", verifyJWT, deleteMessage);

export default router;
