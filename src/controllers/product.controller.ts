import e, { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  // Simulated user data
  const products = [
    { id: 1, name: "Keyboard" },
    { id: 2, name: "Mouse" },
  ];

  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;

  res.json({ id: productId });
};
