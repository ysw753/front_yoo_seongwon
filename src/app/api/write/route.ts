import { createPost, getPosts } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const form = await req.formData(); // 바디 데이터에 접근

  // const title = form.get("title")?.toString();
  // const content = form.get("content")?.toString();
  const requestBody = await req.json(); // 바디 데이터에 접근
  const { title, content } = requestBody;

  if (!title || !content) {
    return new Response("Bad Request", { status: 400 });
  }

  console.log("tttttttt", title, content);
  return createPost({ title, content })
    .then((data) => {
      return NextResponse.json(data);
    })
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
