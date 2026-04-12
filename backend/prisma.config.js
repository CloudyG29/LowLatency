import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export default {
  // Remove "backend/" from the start of these strings
  schema: "prisma/schema.prisma", 
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
};