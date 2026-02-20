import { pool } from "../config/db";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  console.log("• Retrieved users from the database:", result);
  return result.rows;
};
