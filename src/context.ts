import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  userId: string;
  permissions: Set<string>;
}

const prismaClient = new PrismaClient({ log: ['query'] });
export const createContext = ({ req: request }: { req: any }): Context => {
  const userId = request?.headers['user-uuid'];
  const permissions = new Set<string>(request?.headers.permissions);

  return { prisma: prismaClient, userId, permissions };
};
