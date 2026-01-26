import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller";
import { createUserValidation } from "../models/user.model";
import { validate } from "../middleware/validate.middleware";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validate(createUserValidation), createUser);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUserById);

export default router;
