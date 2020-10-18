import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  userId: string;
  permissions: Set<string>;
}

export const createContext = ({
  req: request,
  prisma,
}: {
  req: any;
  prisma?: PrismaClient;
}): Context => {
  const prismaClient = prisma || new PrismaClient({ log: ['query'] });
  const userId = request?.headers['user-uuid'];
  const permissions = new Set<string>(request?.headers.permissions);

  return { prisma: prismaClient, userId, permissions };
};
