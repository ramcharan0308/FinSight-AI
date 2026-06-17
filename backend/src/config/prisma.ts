import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.info('🔌 Database connection established successfully.');
  } catch (error) {
    console.error('❌ Database connection failed to initialize:', error);
    process.exit(1);
  }
};
