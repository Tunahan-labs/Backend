import { UserDB } from "../models/user.model";

export const getAllUsersService = async () => {
  const users = await UserDB.find();

  if (!users || users.length === 0) {
    // catch the error in the controller
    throw new Error("No users found");
  }

  return users;
};

export const getUserByIdService = async (id: string) => {
  const user = await UserDB.findById(id);

  if (!user) {
    throw new Error("User not found");
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
    throw new Error("User with the same name already exists");
  }

  const newUser = { name, age, email, isAdmin };
  const createdUser = await UserDB.create(newUser);
  return createdUser;
};

export const deleteUserByIdService = async (id: string) => {
  const userToDelete = await UserDB.findById(id);

  if (!userToDelete) {
    throw new Error(
      "The user your are trying to delete does not exist...Try again!",
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
    throw new Error(
      "The user you are trying to update does not exist...Try again!",
    );
  }

  Object.assign(userToUpdate, updateData);
  const updatedUser = await userToUpdate.save();

  return updatedUser;
};
