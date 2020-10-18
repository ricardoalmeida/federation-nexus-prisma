import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

export interface Context {
  prisma: PrismaClient;
  userId: string;
  permissions: Set<string>;
}

export const createContext = ({ req: request }: { req: any }): Context => {
  // TODO: remove fallback when gateway sends the header
  const userId = request?.headers['user-uuid'] || '123456';
  const permissions = new Set<string>(request?.headers.permissions);

  return { prisma, userId, permissions };
};
