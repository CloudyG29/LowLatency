const { PrismaClient } = require("../generated/client");

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully!");
  } catch (e) {
    console.error("Connection failed:", e);
    
    process.exit(1); 
  } finally {
    await prisma.$disconnect();
  }
}

main();