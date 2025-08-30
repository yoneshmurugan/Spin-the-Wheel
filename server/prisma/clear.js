// clear.js (place in server/prisma folder)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.spinResult.deleteMany({});
  console.log(`Deleted ${deleted.count} records.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
