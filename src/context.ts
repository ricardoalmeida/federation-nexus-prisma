import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  userId: string;
  scopes: Set<string>;
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
  const scopes = new Set<string>(request?.headers.scopes);

  return { prisma: prismaClient, userId, scopes };
};
