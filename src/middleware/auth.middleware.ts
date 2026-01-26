import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/app.error";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("unauthorised", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const paload = decoded as JwtPayload;

    req.user = { id: paload.id, role: paload.role };

    next();
  } catch (error) {
    next(error);
  }
};
