import mongoose from "mongoose";

export interface ProductDocument {
  name: string;
  price: number;
  description: string;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProductDB = mongoose.model<ProductDocument>(
  "Product",
  productSchema,
);
