import { type Request, type Response } from "express";
import { createdProduct, getAllProducts } from "../services/product.service";

export const getProducts = async (req: Request, res: Response) => {
  const allProducts = await getAllProducts();
  res.status(200).json(allProducts);
};

export const getProductById = (req: Request, res: Response) => {
  const productId = req.params.id;

  res.json({ id: productId });
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newProduct = await createdProduct(name);
    res
      .status(201)
      .json({ status: "product created sucsesfuly", product: newProduct });
  } catch (error) {
    res
      .status(403)
      .json({ message: "error creating product name already used", error });
  }
};
