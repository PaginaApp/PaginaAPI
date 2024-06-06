/* eslint-disable arrow-parens */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const sqlFile = 'prisma/seed.sql';

  const sqlCommands = await fs.promises.readFile(sqlFile, 'utf-8');

  const commands = sqlCommands.split(';');

  commands.forEach(async command => {
    if (command.trim() !== '') {
      try {
        await prisma.$executeRawUnsafe(command);
      } catch (e) {
        console.dir(e);
      }
    }
  });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
