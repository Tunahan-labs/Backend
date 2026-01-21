import express, { type Request, type Response } from "express";
import productRoutes from "./routes/product.router";
import userRoutes from "./routes/user.router";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/products", productRoutes);

  app.use("/api/users", userRoutes);
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  return app;
};
