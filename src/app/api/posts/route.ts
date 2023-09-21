import { getPosts } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const requestBody = await req.json(); // 바디 데이터에 접근
  const { pageindex, pagesize } = requestBody;

  return getPosts(pageindex, pagesize).then((data) => {
    return NextResponse.json(data);
  });
}
