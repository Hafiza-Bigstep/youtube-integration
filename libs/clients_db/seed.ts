import { PrismaClient, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const userDataList = [
  {
    name: 'Alice',
    email: 'user@tepect.com',
  },
  {
    name: 'Nilu',
    email: 'admin@tepect.com',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  const hashPassword = await hash('Password@123', 10);
  const userData = userDataList.map(u => {
    return {
      ...u,
      password: hashPassword,
    } as Prisma.UserCreateInput;
  });
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
