import { getKeywordPost, getOnePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  return getKeywordPost(context.params.keyword).then((data) => {
    return NextResponse.json(data);
  });
}
