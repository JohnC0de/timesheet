import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  const roles = ["EMPLOYEE", "MANAGER", "ADMIN"]
  const createRoles = roles.map(name => prisma.role.create({ data: { name } }))
  await prisma.$transaction(createRoles)

  const defaultUser = {
    name: "John Doe",
    email: "johndoe@email.com",
    password: "johndoedoe"
  }
  await prisma.user.create({ data: defaultUser })

  console.log(`\n🌱  Seed Completed!\n\nRoles created: ${roles.join(", ")}\nUser created: ${defaultUser.email}`)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
