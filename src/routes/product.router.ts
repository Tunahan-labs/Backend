import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../controllers/product.controller";
import { validate } from "../middleware/validate.middleware";
import { createProductValidation } from "../models/product.model";

const router = Router();
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", validate(createProductValidation), createProduct);
router.delete("/:id", deleteProductById);
router.patch("/:id", updateProductById);

export default router;
