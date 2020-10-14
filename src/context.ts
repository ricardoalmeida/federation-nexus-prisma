import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

export interface Context {
  prisma: PrismaClient;
  userId: number;
  scopes: Set<string>;
}

export const createContext = ({ request }: any): Context => {
  const userId = request?.headers['user-id'];
  const scopes = new Set<string>(request?.headers.scopes);

  return { prisma, userId, scopes };
};
