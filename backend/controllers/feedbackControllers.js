import User from "../models/User.js";
import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { feedbackLink } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    const user = await User.findOne({ feedbackLink });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await Feedback.create({
      message,
      user: user._id,
    });

    return res.status(201).json({
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      user: req.user._id,
    });

    return res.status(200).json({
      feedback,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};