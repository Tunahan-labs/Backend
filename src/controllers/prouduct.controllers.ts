import { NextFunction, type Request, type Response } from "express";
import {
  createProduct,
  deleteProductService,
  findAll,
  findById,
  updateProductService,
} from "../services/products.services";
import { CreateProductTypeZ } from "../models/product.model";

export const create = async (
  req: Request<{}, {}, CreateProductTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, description } = req.body;
    const product = await createProduct(name, price, description);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const product = await findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const changes = req.body;
    const updatedProduct = await updateProductService(id, changes);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    await deleteProductService(id);

    res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};
