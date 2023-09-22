import { updatePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function POST(req: NextRequest, context: Context) {
  const requestBody = await req.json(); // 바디 데이터에 접근
  const { title, content, image } = requestBody;
  return updatePost({ title, content, image }, context.params.id)
    .then((data) => {
      return NextResponse.json(data);
    })
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
