import e, { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  // Simulated user data
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  res.status(200).json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const userId = req.params.id;

  res.json({ id: userId });
};
