//Used this code to test if i can create a table

// const { PrismaClient } = require('./generated/client')
// const prisma = new PrismaClient()

// async function main() {
//   // Using raw SQL to select all users
//   const allUsers = await prisma.$queryRaw`SELECT * FROM "User";`
  
//   console.log(allUsers)
// }

// main()

//Code to add a user to the User table

const { PrismaClient } = require('./generated/client')
const prisma = new PrismaClient()

async function main() {
  console.log("1. Successfully connected to Azure SQL!")
  
  // Generate a random email so we don't get duplicate errors
  const randomEmail = `user_${Date.now()}@example.com`;
  
  console.log(`2. Attempting to create user with email: ${randomEmail}...`)
  const newUser = await prisma.user.create({
    data: {
      email: randomEmail,
      name: 'Azure Tester',
    },
  })
  console.log("--> Success! Created user:", newUser)

  console.log("3. Fetching the updated list of all users...")
  const allUsers = await prisma.user.findMany()
  console.log("--> Your database currently holds:", allUsers)
}

main()
  .catch((e) => {
    console.error("Database Error:", e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })