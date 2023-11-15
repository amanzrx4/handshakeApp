import { PrismaClient } from "@prisma/client";

console.log("env bro", Object.keys(process.env).includes("DATABASE_URL"));
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;
