import mongoose from "mongoose";
import { z } from "zod";
export interface ProductDocument {
  name: string;
  price: number;
  description: string;
}

export const createProductValidation = z.object({
  body: z.object({
    name: z.string("Name must be a string").min(2),
    price: z.number("Price must be a number").min(0),
    description: z.string("Description must be a string").min(5),
  }),
});

export type CreateProductTypeZ = z.infer<
  typeof createProductValidation
>["body"];

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
