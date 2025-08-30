// seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing entries to avoid duplicates
  await prisma.spinResult.deleteMany();

  // Insert 1-70 as unallocated numbers
  for (let n = 1; n <= 70; n++) {
    await prisma.spinResult.create({
      data: {
        segment: n,
        userName: '',
        userEmail: null,  // Changed to null for unallocated
      },
    });
  }
  console.log('Seeded numbers 1 to 70 successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
