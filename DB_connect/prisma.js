let PrismaClient;
try {
  ({ PrismaClient } = require("@prisma/client"));
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    ({ PrismaClient } = require("../backend/generated"));
  } else {
    throw error;
  }
}

const { PrismaMssql } = require("@prisma/adapter-mssql");
const adapter = new PrismaMssql(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
