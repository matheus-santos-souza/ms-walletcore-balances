// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.account.createMany({
      data: [
        {
          id: '1',
          balance: 1000,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        {
          id: '2',
          balance: 2500,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
      ],
      skipDuplicates: true,
    });
  } catch (error) {
    console.log('Seed account 2 is exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
