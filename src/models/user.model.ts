import mongoose from "mongoose";

export interface UserDocument {
  name: string;
  age: number;
  email: string;
  isAdmin: boolean;
}

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
