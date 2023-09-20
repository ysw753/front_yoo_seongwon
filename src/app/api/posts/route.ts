import { getAllPosts } from "@/service/post";
import { NextResponse } from "next/server";

export async function GET() {
  return getAllPosts().then((data) => {
    return NextResponse.json(data);
  });
}
