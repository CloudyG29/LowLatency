const { PrismaClient } = require("../generated/client");
const { PrismaMssql } = require("@prisma/adapter-mssql");

const config = {
  server: "lowlatency2.database.windows.net",
  port: 1433,
  database: "SkillBridge",
  user: "CloudSAca3de46",
  password: "lowlatency5",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const adapter = new PrismaMssql(config);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
