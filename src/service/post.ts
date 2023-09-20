import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}
