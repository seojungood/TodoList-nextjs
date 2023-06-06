import { PrismaClient } from "@prisma/client"

// adding prisma to global object
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// setting var prisma to global var prisma 
// or create brand new prisma
export const prisma = 
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

// if not in production, get prisma from global  
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma