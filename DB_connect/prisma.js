require('dotenv').config();
const { PrismaClient } = require('../generated/client');
const { PrismaMssql } = require('@prisma/adapter-mssql');

const adapter = new PrismaMssql(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;