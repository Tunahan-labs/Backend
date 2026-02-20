// src/server.ts
import dotenv from "dotenv";
import { createApp } from "./app";
import { pool } from "./config/db";

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = createApp();

pool
  .connect()
  .then(() => {
    console.log("• Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("• Failed to connect to the database:", err);
    process.exit(1); // Exit the application if the database connection fails
  });

app.listen(PORT, () => {
  console.log(`• Server running on http://localhost:${PORT}`);
});
