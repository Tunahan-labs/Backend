import { Request, Response } from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, age, email, isAdmin } = req.body;
    if (!name || !age || !email || isAdmin === undefined) {
      return res
        .status(400)
        .send({ message: "Name, age, email, and isAdmin are required" });
    }

    // Call the service to create a new user
    const newUser = await createUserService(name, age, email, isAdmin);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id as string);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUserByIdService(id as string);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await updateUserByIdService(id as string, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
