import { PrismaClient } from '@prisma/client';

export function extendPermission(this: PrismaClient) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const prisma = this;
  return this.$extends({
    model: {
      permission: {
        async findById(id: string) {
          return prisma.permission.findFirst({ where: { id } });
        },

        async findByName(name: string) {
          return prisma.permission.findFirst({ where: { name } });
        },

        async deleteByName(name: string) {
          return prisma.permission.delete({ where: { name } });
        },
      },
    },
  });
}
