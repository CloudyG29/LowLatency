require("dotenv").config();
const { PrismaClient } = require("../backend/generated");
const { PrismaMssql } = require("@prisma/adapter-mssql");

const adapter = new PrismaMssql(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
console.log("DATABASE_URL:", process.env.DATABASE_URL);
