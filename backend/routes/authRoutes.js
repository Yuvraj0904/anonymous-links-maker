import express from 'express'
import protectRoute from "../middleware/authMiddleware.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/me", protectRoute, (req, res) => {
  res.json({
    user: req.user,
  });
});
export default router;