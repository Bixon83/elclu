// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Evita crear múltiples instancias en desarrollo
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma: PrismaClient =
  global.prisma ??
  new PrismaClient({
    log: ['query'], // opcional: ver queries en consola
  })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
