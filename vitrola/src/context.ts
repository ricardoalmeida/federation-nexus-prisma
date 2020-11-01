import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({ log: ['query'] });

export interface Context {
  prisma: PrismaClient;
  userId: string;
  permissions: Set<string>;
}

export const createContext = ({ req: request }: { req: any }): Context => {
  const userId = request?.headers['user-id'];
  const permissions = new Set<string>(request?.headers.permissions);

  return { prisma, userId, permissions };
};
