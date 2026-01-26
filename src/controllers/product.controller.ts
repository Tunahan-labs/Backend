import { NextFunction, Request, Response } from "express";
import {
  createProductService,
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
} from "../services/product.service";
import { CreateProductTypeZ } from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const createProduct = async (
  req: Request<{}, {}, CreateProductTypeZ>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res
        .status(400)
        .send({ message: "Name, price, and description are required" });
    }

    // Call the service to create a new product
    const newProduct = await createProductService(name, price, description);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id as string);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await deleteProductByIdService(id as string);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await updateProductByIdService(id as string, req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
