import { pool } from "../config/db";
import bcrypt from "bcrypt";

interface USER {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

export const getAllUsersService = async () => {
  const results = await pool.query<Partial<USER>>(
    "SELECT id, firstname, lastname, email, admin, created_at, updated_at FROM users",
  );
  console.log(results);

  return results.rows;
};

export const getUserByIdService = async (id: string) => {
  const query =
    "SELECT id, firstname, lastname, email, admin, created_at, updated_at FROM users WHERE id = $1";

  const result = await pool.query<Partial<USER>>(query, [id]);

  if (!result) throw new Error("User not found...");
  return result.rows[0] || null;
};

const createUserService = async (data: Partial<USER>) => {
  const query =
    "INSERT INTO users (firstname, lastname, email, password, admin) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, admin, created_at, updated_at";

  const encryptedPassword = await bcrypt.hash(data.password as string, 10);
  const values = [data.firstname, data.lastname, data.email, encryptedPassword];

  const result = await pool.query<Partial<USER>>(query, values);
  if (!result) throw new Error("User not created...");

  return result.rows[0];
};

export const updateUserService = async (
  id: string,
  updateData: Partial<USER>,
) => {
  const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClauses = fields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");

  const query = `UPDATE users SET ${setClauses} WHERE id = ${id} RETURNING id, firstname, lastname, email, admin, created_at, updated_at`;

  const result = await pool.query<Partial<USER>>(query, values);
  if (!result) throw new Error("User not updated...");

  return result.rows[0];
};
