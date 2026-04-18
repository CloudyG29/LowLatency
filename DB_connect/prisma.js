require("dotenv").config({ path: "./backend/prisma/.env" });

const { PrismaClient } = require("@prisma/client");
const { PrismaMssql } = require("@prisma/adapter-mssql");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Check backend/prisma/.env");
}

const adapter = new PrismaMssql(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
