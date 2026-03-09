import { prisma } from "../config/db";
import { CreateUserTypeZ } from "../models/user.model";
import { AppError } from "../utils/app.error";
import bycrypt from "bcrypt";

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });

  return users;
};

export const createUserService = async (data: CreateUserTypeZ) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (existingUser) {
    throw new AppError("An user with that user already exists", 409);
  }

  //encrypt password
  const hashedPassword = await bycrypt.hash(data.password, 12);

  return prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      password: hashedPassword,
      email: data.email,
    },
  });
};

export const getUserByIdService = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });

  if (!user) {
    throw new AppError("This user doesn't exist", 404);
  }

  return user;
};
