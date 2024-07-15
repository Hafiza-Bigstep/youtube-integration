import { ContainerModule } from 'inversify';
import { PrismaClient, Prisma } from '@prisma/client';
import { tracedPrismaClient } from './lib/tracedPrismaClient';

export type { PrismaClient };

export { Prisma };

export const PrismaClientSymbol = Symbol.for('PRISMA_CLIENT');

export const prismaClientModule = new ContainerModule(function (bind) {
  bind<PrismaClient>(PrismaClientSymbol)
    .toDynamicValue(tracedPrismaClient)
    .inSingletonScope();
});

export { mapFromPrismaObject, mapToPrismaObject } from './lib/mappers';

export * from './extensions';
