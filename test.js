const { PrismaClient } = require("./generated/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log("✅ Connected to database successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Connection failed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
