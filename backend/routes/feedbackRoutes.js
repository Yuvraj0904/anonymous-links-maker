import express from "express";
import {
  submitFeedback,
  getMyFeedback,
} from "../controllers/feedbackControllers.js";
import protectRoute from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:feedbackLink",submitFeedback);
router.get("/", protectRoute, getMyFeedback);
export default router;