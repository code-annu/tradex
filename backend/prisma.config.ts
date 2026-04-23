import "dotenv/config";
import { defineConfig } from "prisma/config";
import { ENV } from "./src/config/constants";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: ENV.DATABASE_URL,
  },
});
