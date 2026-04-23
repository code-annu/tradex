import express from "express";
import { db } from "./config/db";
import authRouter from "./features/authentication/auth.router";
import { handleError } from "./middlewares/error.handler.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const result = await db.query("SELECT * FROM temp");
  console.log(result);
  res.json(result.rows);
});

app.use("/api/auth", authRouter);

app.use(handleError);

export default app;
