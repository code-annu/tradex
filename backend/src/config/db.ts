import { Pool } from "pg";
import { ENV } from "./constants";

export const db = new Pool({
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
});

export const connectDB = async () => {
  try {
    await db.connect();
    console.log("PostgreSQL Connected");
  } catch (error) {
    console.error("DB Error:", error);
  }
};
