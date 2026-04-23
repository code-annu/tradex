import express from "express";
import { db } from "./config/db";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const result = await db.query("SELECT * FROM temp");
  console.log(result);
  res.json(result.rows);
});

export default app;
