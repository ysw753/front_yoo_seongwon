import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getOnePost(id: string) {
  //console.log("id", id);
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return post;
}

export async function getKeywordPost(keyword: string) {
  //console.log("id", id);
  const post = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            startsWith: keyword,
          },
        },
      ],
    },
  });
  return post;
}
