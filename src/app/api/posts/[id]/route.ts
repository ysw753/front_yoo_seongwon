import { getOnePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  console.log("asdasd", context.params.id);
  return getOnePost(context.params.id).then((data) => {
    return NextResponse.json(data);
  });
}
