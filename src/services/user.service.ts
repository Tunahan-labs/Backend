import { UserDB } from "../models/user.model";
import { AppError } from "../utils/app.error";

export const getAllUsersService = async () => {
  const users = await UserDB.find();

  if (!users || users.length === 0) {
    // catch the error in the controller
    throw new AppError("No users found", 404);
  }

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await UserDB.findById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const createUserService = async (
  name: string,
  age: number,
  email: string,
  isAdmin: boolean,
) => {
  const existingUser = await UserDB.findOne({ name });

  if (existingUser) {
    throw new AppError("User with the same name already exists", 409);
  }

  const newUser = { name, age, email, isAdmin };
  const createdUser = await UserDB.create(newUser);
  return createdUser;
};

export const deleteUserByIdService = async (id: string) => {
  const userToDelete = await UserDB.findById(id);

  if (!userToDelete) {
    throw new AppError(
      "The user your are trying to delete does not exist...Try again!",
      404,
    );
  }

  const deleted = await UserDB.findByIdAndDelete(userToDelete._id);

  return {
    deleted,
    message: `${deleted?.name} has been deleted.`,
  };
};

export const updateUserByIdService = async (
  id: string,
  updateData: { name: string; age: number; email: string; isAdmin: boolean },
) => {
  const userToUpdate = await UserDB.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!userToUpdate) {
    throw new AppError(
      "The user you are trying to update does not exist...Try again!",
      404,
    );
  }

  Object.assign(userToUpdate, updateData);
  const updatedUser = await userToUpdate.save();

  return updatedUser;
};
