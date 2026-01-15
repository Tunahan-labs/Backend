import express, { type Request, type Response } from "express";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());

//* routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

export default app;
