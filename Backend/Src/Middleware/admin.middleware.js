import { ApiError } from "../Utils/ApiError.js";

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Access denied. Admins only.");
  }
  next();
};

export { isAdmin };
