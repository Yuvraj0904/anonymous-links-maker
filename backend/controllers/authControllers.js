import bcrypt from "bcryptjs";
import User from "../models/User.js";
import crypto from "crypto";
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const feedbackLink = crypto.randomBytes(16).toString("hex");
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      feedbackLink,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        feedbackLink: user.feedbackLink,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};
