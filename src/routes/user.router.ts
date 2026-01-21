import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUsers,
  getUserById,
  updateUserById,
} from "../controllers/user.controller";

const router = Router();
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUserById);
router.patch("/:id", updateUserById);

export default router;
