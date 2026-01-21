import mongoose from "mongoose";

export interface UserDocument {
  name: string;
  price: number;
  description: string;
}

const productSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductDB = mongoose.model<UserDocument>("Product", productSchema);
