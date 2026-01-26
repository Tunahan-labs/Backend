import mongoose from "mongoose";
import { z } from "zod";

export interface UserDocument {
  name: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

export const createUserValidation = z.object({
  body: z.object({
    name: z.string("Name must be a string").min(2),
    age: z.number("Age must be a number").min(0).max(0),
    email: z.string("Email must be a string"),
    isAdmin: z.boolean("isAdmin must be a boolean").optional(),
  }),
});

export type CreateUserTypeZ = z.infer<typeof createUserValidation>["body"];

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

export const UserDB = mongoose.model<UserDocument>("User", userSchema);
