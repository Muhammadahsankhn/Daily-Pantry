

import { Contact } from "../Models/Contact.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !(email).trim()) throw new ApiError(400, "Email is required");
  if (!name || !(name).trim()) throw new ApiError(400, "Name is required");
  if (!message || !(message).trim()) throw new ApiError(400, "Message is required");

  const newMessage = await Contact.create({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    message: String(message).trim(),
    user: req.user?._id || null,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newMessage, "Message sent successfully"));
});


const getMessageById = asyncHandler(async (req, res) => {
  const { id: messageId } = req.params;

  if (!messageId) throw new ApiError(400, "Message ID is required");

  const message = await Contact.findById(messageId).populate("user", "username email role");
  if (!message) throw new ApiError(404, "Message not found");


  if (req.user && req.user.role === "admin") {
    return res.status(200).json(new ApiResponse(200, message, "Message fetched"));
  }

  if (req.user && String(message.user?._id) === String(req.user._id)) {
    return res.status(200).json(new ApiResponse(200, message, "Message fetched"));
  }

  throw new ApiError(403, "Forbidden - you are not allowed to view this message");
});


const getAllMessages = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Forbidden — Admin only");
  }

  const messages = await Contact.find().sort({ createdAt: -1 }).populate("user", "username email");
  return res.status(200).json(new ApiResponse(200, messages, "Messages fetched"));
});


const deleteMessage = asyncHandler(async (req, res) => {
  const { id: messageId } = req.params;

  if (!messageId) throw new ApiError(400, "Message ID is required");

  const message = await Contact.findById(messageId);
  if (!message) throw new ApiError(404, "Message not found");

  if (req.user && (req.user.role === "admin" || String(message.user) === String(req.user._id))) {
    await Contact.findByIdAndDelete(messageId);
    return res
      .status(200)
      .json(new ApiResponse(200, message, "Message deleted successfully"));
  }

  throw new ApiError(403, "Forbidden — you are not allowed to delete this message");
});

export { sendMessage, getMessageById, getAllMessages, deleteMessage };
