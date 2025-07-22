import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controller/UserController.js";
import { protect } from "../middleware/authMiddle.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected route to get user profile
userRouter.get("/profile", protect, getUserProfile);

export default userRouter;
