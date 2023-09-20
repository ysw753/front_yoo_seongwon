import { getOnePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return getOnePost(context.params.id).then((data) => {
    return NextResponse.json(data);
  });
}
