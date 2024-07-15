import { PrismaClient } from '@prisma/client';

export const tracedPrismaClient = () => {
  const prisma = new PrismaClient();

  prisma.$use((params: any, next: any) => {
    console.log(`Starting trace for ${params.model}.${params.action}`);
    const startTime = Date.now();

    // Execute the actual query
    const result = next(params);

    result.then(() => {
      const duration = Date.now() - startTime;
      console.log(
        `Finished trace for ${params.model}.${params.action}. Duration: ${duration}ms`
      );
    });

    return result;
  });

  return prisma;
};
