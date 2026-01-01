import { User } from "../Models/User.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

/* ---------------- REGISTER USER / ADMIN ---------------- */
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username?.trim()) throw new ApiError(400, "Username is required");
  if (!email?.trim()) throw new ApiError(400, "Email is required");
  if (!password?.trim()) throw new ApiError(400, "Password is required");

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "Email or Username already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role: role === "admin" ? "admin" : "user", // ✅ PROFESSIONAL
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res.status(201).json(
    new ApiResponse(
      201,
      createdUser,
      role === "admin"
        ? "Admin registered successfully"
        : "User registered successfully"
    )
  );
});

/* ---------------- LOGIN ---------------- */
const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim()) throw new ApiError(400, "Email is required");
  if (!password?.trim()) throw new ApiError(400, "Password is required");

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new ApiError(400, "Invalid email or password");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new ApiError(400, "Invalid email or password");

  const token = user.generateAccessToken();
  const userData = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json(
      new ApiResponse(
        200,
        { user: userData, token }, // ✅ TOKEN SENT
        "Login successful"
      )
    );
});

/* ---------------- LOGOUT ---------------- */
const userLogout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("accessToken")
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export { userRegister, LoginUser, userLogout };
