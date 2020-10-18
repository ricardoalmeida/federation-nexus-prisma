import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

export interface Context {
  prisma: PrismaClient;
  userId: number;
  scopes: Set<string>;
}

export const createContext = ({ req: request }: { req: any }): Context => {
  const userId = Number(request?.headers['user-id']);
  const scopes = new Set<string>(request?.headers.scopes);

  return { prisma, userId, scopes };
};
