import { PrismaClient } from '@prisma/client';

export function extendRole(this: PrismaClient) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const prisma = this;
  return prisma.$extends({
    model: {
      role: {
        async findById(id: string) {
          return prisma.role.findFirst({ where: { id } });
        },

        async hasPermission(roleId: string, permission: string) {
          return await prisma.rolePermission.findFirst({
            where: {
              roleId,
              permissionName: permission,
            },
          });
        },

        async deletePermission(roleId: string, permission: string) {
          return await prisma.rolePermission.deleteMany({
            where: {
              roleId,
              permissionName: permission,
            },
          });
        },

        async addPermission(roleId: string, permission: string) {
          return await prisma.rolePermission.create({
            data: {
              roleId,
              permissionName: permission,
            },
          });
        },
      },
    },
  });
}
