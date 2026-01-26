import { Router } from "express";
import {
  registerController,
  loginController,
} from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", protect, registerController);
router.post("/login", protect, loginController);
export default router;
