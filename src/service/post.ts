import { SinglePost } from "@/model/post";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getPosts(pageindex = 1, pagesize = 10) {
  const skip = (pageindex - 1) * pagesize;
  const totalPostsCount = await prisma.post.count();
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    skip,
  });

  return { posts, totalPostsCount };
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

export async function createPost(postData: SinglePost) {
  console.log(postData);
  await prisma.post.create({
    data: {
      title: postData.title,
      content: postData.content,
    },
  });
}
